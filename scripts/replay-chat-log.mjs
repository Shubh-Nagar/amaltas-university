// Replays an exported chat log (the Google Sheet written by chat-log-apps-script.gs,
// downloaded as .xlsx) through the current assistant engine, session by session,
// and lists what it still can't answer. Run after editing assistantKB.js:
//
//   npm run chat:replay -- "path/to/chatbot data.xlsx"
//   npm run chat:replay -- "path/to/chatbot data.xlsx" --all   (print every answer)
import XLSX from "xlsx";
import { reply, createState } from "../src/data/assistantKB.js";

const file = process.argv[2];
if (!file) {
  console.error('Usage: npm run chat:replay -- "<chat log .xlsx>" [--all]');
  process.exit(1);
}
const showAll = process.argv.includes("--all");

const book = XLSX.readFile(file);
const sheet = book.Sheets[book.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet).filter((r) => r["Question"]);

const sessions = new Map();
const topics = {};
const stillMissed = [];
let wasMissed = 0;
let nowAnswered = 0;

for (const r of rows) {
  const id = r["Session ID"] || "none";
  const res = reply(sessions.get(id) || createState(), String(r["Question"]));
  sessions.set(id, res.state);
  const { topic, answered } = res.meta;
  topics[topic] = (topics[topic] || 0) + 1;
  if (r["Answered"] === "No") {
    wasMissed++;
    if (answered) nowAnswered++;
  }
  if (!answered) stillMissed.push(r["Question"]);
  if (showAll) {
    const first = res.replies[0].text.replace(/\*\*/g, "").split("\n").slice(0, 2).join(" | ");
    console.log(`${topic.padEnd(14)} ${String(r["Question"]).slice(0, 60).padEnd(60)} → ${first.slice(0, 140)}`);
  }
}

console.log(`\nReplayed ${rows.length} questions from ${sessions.size} sessions.`);
console.log(`Unanswered in the log: ${wasMissed} → answered now: ${nowAnswered}`);
console.log(`Still unanswered: ${stillMissed.length}`);
for (const q of stillMissed) console.log(`  • ${q}`);
console.log("\nTopics:", Object.entries(topics).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", "));
