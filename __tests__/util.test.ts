import { describe, test, expect } from "bun:test";
import { createLrcObj } from "../packages/util";
import type { LrcObj } from "../packages/type";

describe("createLrcObj", () => {
  test("should return empty array for empty string", () => {
    const result = createLrcObj("");
    expect(result).toEqual([]);
  });

  test("should parse basic LRC format with single time tag", () => {
    const lrc = `[00:00]Hello World`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Hello World" }
    ]);
  });

  test("should parse LRC with multiple time tags for same lyric", () => {
    const lrc = `[00:00][00:05]Hello World`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Hello World" },
      { t: 5, c: "Hello World" }
    ]);
  });

  test("should parse LRC with minutes and seconds", () => {
    const lrc = `[01:30]Hello World`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 90, c: "Hello World" }
    ]);
  });

  test("should parse LRC with tag metadata (title, artist, album)", () => {
    const lrc = `[ti: Song Title]
[ar: Artist Name]
[al: Album Name]
[00:00]Hello World`;
    const result = createLrcObj(lrc);
    // Metadata tags are processed but don't appear in output array
    expect(result).toEqual([
      { t: 0, c: "Hello World" }
    ]);
  });

  test("should parse LRC with seconds that have decimal places", () => {
    const lrc = `[00:12.34]Hello World`;
    const result = createLrcObj(lrc);
    expect(result.length).toBe(1);
    expect(result[0].c).toBe("Hello World");
    // parseFloat will parse 12.34 correctly
    expect(result[0].t).toBeCloseTo(12.34, 2);
  });

  test("should sort lyrics by time order", () => {
    const lrc = `[00:10]Second line
[00:05]First line
[00:00]Start line`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Start line" },
      { t: 5, c: "First line" },
      { t: 10, c: "Second line" }
    ]);
  });

  test("should handle lyrics with empty content", () => {
    const lrc = `[00:00]
[00:05]Has content`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "" },
      { t: 5, c: "Has content" }
    ]);
  });

  test("should handle multiple lines with multiple time tags", () => {
    const lrc = `[00:00][00:30]Line 1
[00:15][00:45]Line 2`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Line 1" },
      { t: 15, c: "Line 2" },
      { t: 30, c: "Line 1" },
      { t: 45, c: "Line 2" }
    ]);
  });

  test("should trim whitespace from lines", () => {
    const lrc = `  [00:00]  Hello World  `;
    const result = createLrcObj(lrc);
    // Note: createLrcObj trims the line, but the content after time tag keeps its leading spaces
    expect(result).toEqual([
      { t: 0, c: "  Hello World" }
    ]);
  });

  test("should handle LRC with offset tag", () => {
    const lrc = `[offset:+1000]
[00:00]Hello World`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Hello World" }
    ]);
  });

  test("should parse complex LRC file with multiple lines", () => {
    const lrc = `[ti:Test Song]
[ar:Test Artist]
[al:Test Album]
[00:00.00]Line 1
[00:05.50]Line 2
[00:10.00]Line 3
[00:15.75]Line 4`;
    const result = createLrcObj(lrc);
    expect(result.length).toBe(4);
    expect(result[0]).toEqual({ t: 0, c: "Line 1" });
    expect(result[1]).toEqual({ t: 5.5, c: "Line 2" });
    expect(result[2]).toEqual({ t: 10, c: "Line 3" });
    expect(result[3]).toEqual({ t: 15.75, c: "Line 4" });
  });

  test("should handle lines without valid time tags", () => {
    const lrc = `Just some text without time tag
[00:00]Valid line`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Valid line" }
    ]);
  });

  test("should handle metadata tags mixed with lyrics", () => {
    // Metadata tags after lyrics - tests the for...in loop in util.ts
    const lrc = `[00:00]First line
[ti:Title]
[ar:Artist]`;
    const result = createLrcObj(lrc);
    // Metadata tags don't appear in output, only lyrics do
    expect(result).toEqual([
      { t: 0, c: "First line" }
    ]);
  });

  test("should handle offset tag with positive value", () => {
    const lrc = `[offset:+500]
[00:00]Hello`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Hello" }
    ]);
  });

  test("should handle offset tag with negative value", () => {
    const lrc = `[offset:-500]
[00:00]Hello`;
    const result = createLrcObj(lrc);
    expect(result).toEqual([
      { t: 0, c: "Hello" }
    ]);
  });
});
