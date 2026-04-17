import type { HLTBGame } from "../schemas/game";
import { HLTBGameSchema } from "../schemas/game";

const HLTB_API_BASE_URL = "https://hltbapi.codepotatoes.de/";

export const getHLTBGameBySteamAppId = async (steamAppId: number): Promise<HLTBGame | null> => {
  const url = new URL(`steam/${steamAppId}`, HLTB_API_BASE_URL);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: status ${response.status}`);
  }

  const body = await response.json();
  const result = HLTBGameSchema.safeParse({
    gameId: body.hltbId,
    name: body.title,
    times: {
      mainStory: body.mainStory,
      mainExtras: body.mainStoryWithExtras,
      completionist: body.completionist,
    },
  });

  if (!result.success) {
    throw new Error(`Invalid HLTB game data: ${result.error.message || "validation failed"}`);
  }

  return result.data;
};
