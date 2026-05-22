import assert from "node:assert/strict";
import test from "node:test";
import {
  buildSteps,
  resolveConfig,
  runSteps,
  truncateResult,
  type WeeklyRadarIO,
  type WeeklyRadarStep,
} from "./weekly-tech-stack-radar.js";

function createIOBuffers(): {
  io: WeeklyRadarIO;
  logs: string[];
  writes: string[];
  errors: string[];
} {
  const logs: string[] = [];
  const writes: string[] = [];
  const errors: string[] = [];
  return {
    io: {
      log: (message) => logs.push(message),
      write: (text) => writes.push(text),
      error: (message) => errors.push(message),
    },
    logs,
    writes,
    errors,
  };
}

function createRun(
  events: Array<{ type: string; [key: string]: unknown }>,
  result: { status: string; result?: string | null },
): {
  stream: () => AsyncIterable<{ type: string; [key: string]: unknown }>;
  wait: () => Promise<{ status: string; result?: string | null }>;
} {
  return {
    stream: async function* () {
      for (const event of events) {
        yield event;
      }
    },
    wait: async () => result,
  };
}

test("resolveConfig uses explicit GitHub env values", () => {
  const config = resolveConfig({
    CURSOR_API_KEY: "test-api-key",
    GITHUB_REPOSITORY: "acme/project",
    GITHUB_REF_NAME: "feature-branch",
  });

  assert.equal(config.apiKey, "test-api-key");
  assert.equal(config.repoUrl, "https://github.com/acme/project");
  assert.equal(config.startingRef, "feature-branch");
});

test("resolveConfig falls back to default repository and ref", () => {
  const config = resolveConfig({
    CURSOR_API_KEY: "test-api-key",
  });

  assert.equal(config.repoUrl, "https://github.com/VolantTyler/AgentOS");
  assert.equal(config.startingRef, "main");
});

test("resolveConfig throws when CURSOR_API_KEY is missing", () => {
  assert.throws(() => resolveConfig({}), /Missing CURSOR_API_KEY/);
});

test("truncateResult appends ellipsis only when content exceeds limit", () => {
  const short = "abc";
  const exact = "12345";
  const long = "x".repeat(6);

  assert.equal(truncateResult(short, 5), "abc");
  assert.equal(truncateResult(exact, 5), "12345");
  assert.equal(truncateResult(long, 5), "xxxxx…");
});

test("runSteps streams assistant text and logs truncated final result", async () => {
  const { io, logs, writes } = createIOBuffers();
  const step: WeeklyRadarStep = { name: "step-1", prompt: "run step 1" };
  const longResult = "z".repeat(4010);

  const agent = {
    send: async (prompt: string) => {
      assert.equal(prompt, step.prompt);
      return createRun(
        [
          { type: "assistant", message: { content: [{ type: "text", text: "hello " }, { type: "tool_use" }] } },
          { type: "assistant", message: { content: [{ type: "text", text: "world" }] } },
          { type: "status", status: "running", message: "working" },
        ],
        { status: "completed", result: longResult },
      );
    },
  };

  const success = await runSteps(agent, [step], io);

  assert.equal(success, true);
  assert.equal(writes.join(""), "hello world");
  assert.ok(logs.some((entry) => entry.includes("[status] running: working")));
  assert.ok(logs.some((entry) => entry.includes("[step-1] status=completed")));
  assert.ok(logs.some((entry) => entry.endsWith("…")));
});

test("runSteps stops immediately when a step returns error", async () => {
  const { io } = createIOBuffers();
  const steps = buildSteps();
  const sentPrompts: string[] = [];
  let sendCall = 0;

  const agent = {
    send: async (prompt: string) => {
      sentPrompts.push(prompt);
      sendCall += 1;
      if (sendCall === 1) {
        return createRun([], { status: "error", result: "failed" });
      }
      return createRun([], { status: "completed", result: null });
    },
  };

  const success = await runSteps(agent, steps, io);

  assert.equal(success, false);
  assert.equal(sentPrompts.length, 1);
});
