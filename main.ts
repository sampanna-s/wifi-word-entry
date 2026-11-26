import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "gaslighting";

// Mirror the gate and task: UTF-8 text, 1-20 characters, not only white
// space, and a single word describing the Wi-Fi.
function assertValidWord(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 20 || text.trim() === "" || !/^[A-Za-z]+$/.test(text)) {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(outputDir, text) {
  mkdirSync(outputDir, { recursive: true });
  const tmp = join(outputDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outputDir, "entry.txt"));
}

assertValidWord(word);
writeEntryAtomically(process.env.MAKEFUN_OUTPUT_DIR || "/output", word);
