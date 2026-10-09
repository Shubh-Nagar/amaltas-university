import { describe, it, expect } from "vitest";
import { reply, createState, normalize } from "./assistantKB.js";

// reply() is a pure function: (state, text) -> { state, replies, meta }.
// No React or network involved, so we can test the bot's "brain" directly.
const ask = (text, state = createState()) => reply(state, text);

describe("normalize", () => {
  it("lowercases, removes punctuation and joins dotted course names", () => {
    expect(normalize("What's the B.Sc. Nursing FEE?")).toBe("whats the bsc nursing fee");
  });
});

describe("Amaltas Assistant reply engine", () => {
  it("answers a fee question with the course's fee", () => {
    const { replies, meta, state } = ask("BAMS fees");
    expect(replies[0].text).toContain("BAMS");
    expect(replies[0].text).toMatch(/₹[\d,]+/);
    expect(meta.answered).toBe(true);
    expect(state.lastProgIds).toContain("bams"); // remembered for follow-ups
  });

  it("understands Hinglish and replies in Hinglish", () => {
    const { state, meta } = ask("BAMS ki fees kitni hai?");
    expect(state.lang).toBe("hi");
    expect(meta.answered).toBe(true);
  });

  it("uses context: a bare 'fees' follow-up refers to the last course", () => {
    const first = ask("Tell me about BAMS");
    const second = ask("fees", first.state);
    expect(second.replies[0].text).toContain("BAMS");
  });

  it("says plainly when a course is not offered instead of guessing", () => {
    const { meta } = ask("MBA admission");
    expect(meta.topic).toBe("not-offered");
  });

  it("falls back and escalates to the admissions team after repeated misses", () => {
    const miss1 = ask("asdfgh qwerty");
    expect(miss1.meta.answered).toBe(false);
    const miss2 = ask("zzzz xxxx", miss1.state);
    expect(miss2.state.misses).toBe(2);
    expect(miss2.replies[0].text).toMatch(/admissions team/i);
  });
});
