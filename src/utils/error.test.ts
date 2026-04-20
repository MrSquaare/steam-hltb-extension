import { describe, expect, it } from "vitest";

import { getErrorMessage } from "./error";

describe("getErrorMessage", () => {
  it("should return the error message for an error", () => {
    expect(getErrorMessage(new Error("Error message"))).toBe("Error message");
  });

  it("should return the string representation for a non-error", () => {
    expect(getErrorMessage("String")).toBe("String");
    expect(getErrorMessage(123)).toBe("123");
    expect(getErrorMessage({ message: "Hello, World!" })).toBe("[object Object]");
  });
});
