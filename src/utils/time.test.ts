import { describe, expect, it } from "vitest";

import { formatHours } from "./time";

describe("formatHours", () => {
  it("should format '—' for null, undefined, or non-positive values", () => {
    expect(formatHours(null)).toBe("—");
    expect(formatHours(undefined)).toBe("—");
    expect(formatHours(0)).toBe("—");
    expect(formatHours(-5)).toBe("—");
  });

  it("should format minutes for values less than 1", () => {
    expect(formatHours(0.01)).toBe("1 Minute");
    expect(formatHours(0.5)).toBe("30 Minutes");
    expect(formatHours(0.99)).toBe("59 Minutes");
  });

  it("should format hours for plain hours", () => {
    expect(formatHours(1)).toBe("1 Hour");
    expect(formatHours(5)).toBe("5 Hours");
    expect(formatHours(10)).toBe("10 Hours");
  });

  it("should format half hours for 1+ with a half hours", () => {
    expect(formatHours(1.5)).toBe("1½ Hours");
    expect(formatHours(5.5)).toBe("5½ Hours");
    expect(formatHours(10.5)).toBe("10½ Hours");
  });
});
