import { describe, expect, test } from "bun:test";
import { getISODateString } from "./eventService";

describe("Event service tests", () => {
  describe("getISODateString", () => {
    test.each([
      { date: new Date("2000-01-01T06:00:00+05:00"), expected: "2000-01-01" },
      { date: new Date("2000-01-01T06:00:00Z"), expected: "2000-01-01" },
      { date: new Date("2000-01-01T06:00:00"), expected: "2000-01-01" },
      { date: new Date("2000-01-01"), expected: "2000-01-01" },
      { date: new Date(0), expected: "1970-01-01" },
    ])(
      "should create ISO date string successfully with $expected",
      ({ expected, date }) => {
        const result = getISODateString(date);

        expect(result).toEqual(expected);
      },
    );
  });
});
