import { describe, expect, it } from "vitest";

import { getSteamAppIdFromPathname } from "./steam";

describe("getSteamAppIdFromPathname", () => {
  it("should return the app ID from a valid pathname", () => {
    expect(getSteamAppIdFromPathname("/app/12345/some-game/")).toBe(12345);
  });

  it("should return null for an invalid pathname", () => {
    expect(getSteamAppIdFromPathname("/invalid/path/")).toBeNull();
    expect(getSteamAppIdFromPathname("/app/not-a-number/some-game/")).toBeNull();
  });
});
