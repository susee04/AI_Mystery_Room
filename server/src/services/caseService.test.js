const test = require("node:test");
const assert = require("node:assert/strict");
const { DIFFICULTIES } = require("../config/gameRules");
const { createLocalMystery } = require("./localMysteries");
const { validateGeneratedMystery } = require("./caseService");

for (const [difficulty, rules] of Object.entries(DIFFICULTIES)) {
  test(`${difficulty} local mystery passes generation validation`, () => {
    const mystery = validateGeneratedMystery(createLocalMystery(difficulty), rules);

    assert.equal(mystery.suspects.length, rules.suspects);
    assert.equal(mystery.clues.length, rules.clues);
    assert.equal(mystery.hints.length, rules.hints);
    assert.ok(mystery.evidence.length >= 3);
    assert.ok(mystery.suspects.some((suspect) => suspect.id === mystery.culprit));
    assert.ok(mystery.supportingEvidence.every((id) =>
      mystery.clues.some((clue) => clue.id === id)
        || mystery.evidence.some((evidence) => evidence.id === id)));
  });
}
