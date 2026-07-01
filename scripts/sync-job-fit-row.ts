/**
 * Append one job-fit scorecard row to the tracker Google Sheet via gws.
 *
 * Used locally and by `.github/workflows/sync-job-fit-row.yml` when cloud
 * `/job-fit` runs cannot reach local gws + .env config.
 *
 * Env:
 *   JOB_FIT_TRACKER_SPREADSHEET_ID (required)
 *   JOB_FIT_TRACKER_SHEET_RANGE (default: Job Fit Agent Reviews!A:R)
 *   ROW_JSON — JSON array of 18 cell strings, e.g. ["2026-06-30","Acme",...]
 *
 * Or pass ROW_JSON as the first CLI argument.
 *
 * Optional:
 *   VERIFY_ONLY=1 — read back the sheet range instead of appending
 */

import { spawnSync } from "node:child_process";

const EXPECTED_COLUMNS = 18;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function parseRowJson(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    fail(
      "Missing ROW_JSON. Pass a JSON array of 18 strings via env or argv[2].",
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    fail("ROW_JSON is not valid JSON.");
  }

  if (!Array.isArray(parsed)) {
    fail("ROW_JSON must be a JSON array.");
  }

  if (parsed.length !== EXPECTED_COLUMNS) {
    fail(
      `ROW_JSON must have exactly ${EXPECTED_COLUMNS} values; got ${parsed.length}.`,
    );
  }

  return parsed.map((cell, index) => {
    if (cell === null || cell === undefined) {
      return "";
    }
    if (typeof cell !== "string" && typeof cell !== "number") {
      fail(`ROW_JSON[${index}] must be a string or number.`);
    }
    return String(cell);
  });
}

function runGws(args: string[]): void {
  const result = spawnSync("gws", args, {
    encoding: "utf8",
    env: process.env,
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.error) {
    fail(`Failed to run gws: ${result.error.message}`);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function main(): void {
  const spreadsheetId = process.env.JOB_FIT_TRACKER_SPREADSHEET_ID?.trim();
  if (!spreadsheetId) {
    fail("Missing JOB_FIT_TRACKER_SPREADSHEET_ID.");
  }

  const sheetRange =
    process.env.JOB_FIT_TRACKER_SHEET_RANGE?.trim() ??
    "Job Fit Agent Reviews!A:R";

  const verifyOnly = process.env.VERIFY_ONLY === "1";

  if (verifyOnly) {
    console.log(`Reading ${spreadsheetId} range ${sheetRange} ...`);
    runGws([
      "sheets",
      "+read",
      "--spreadsheet",
      spreadsheetId,
      "--range",
      sheetRange,
    ]);
    return;
  }

  const rowJson = process.env.ROW_JSON ?? process.argv[2];
  const row = parseRowJson(rowJson);

  const params = JSON.stringify({
    spreadsheetId,
    range: sheetRange,
    valueInputOption: "RAW",
  });
  const body = JSON.stringify({ values: [row] });

  console.log(
    `Appending job-fit row for ${row[1] ?? "?"} — ${row[2] ?? "?"} ...`,
  );

  runGws([
    "sheets",
    "spreadsheets",
    "values",
    "append",
    "--params",
    params,
    "--json",
    body,
  ]);

  console.log("Append succeeded. Reading back latest rows ...");
  runGws([
    "sheets",
    "+read",
    "--spreadsheet",
    spreadsheetId,
    "--range",
    sheetRange,
  ]);
}

main();
