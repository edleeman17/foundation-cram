// Sanity-check the question bank and that every EX307 pointer resolved.
const fs = require("fs");
eval(fs.readFileSync(__dirname + "/../site/questions.js", "utf8") + `
let refs = 0;
QUESTIONS.forEach(q => {
  if (q[2].length !== 4 || !TOPICS[q[0]] || typeof q[3] !== "string") throw new Error("bad row: " + q[1]);
  if (new Set(q[2]).size !== 4) throw new Error("duplicate option: " + q[1]);
  if (q[4]) { refs++; if (!q[4].p || !q[4].label) throw new Error("bad ref: " + q[1]); }
});
// The answer mustn't give itself away by being much longer than every
// distractor; put the detail in the explanation instead.
const giveaways = QUESTIONS.filter(q => {
  const [c, ...rest] = q[2].map(o => o.length), mx = Math.max(...rest);
  return c >= 1.5 * mx && c - mx >= 8;
});
if (giveaways.length) throw new Error("answer much longer than the distractors: " + giveaways.map(q => q[1]).join(" | "));
const longest = QUESTIONS.filter(q => q[2][0].length > Math.max(...q[2].slice(1).map(o => o.length))).length;
console.log(QUESTIONS.length + " questions, " + refs + " with EX307 pointers; answer is the longest option in " + Math.round(100 * longest / QUESTIONS.length) + "%");`);
