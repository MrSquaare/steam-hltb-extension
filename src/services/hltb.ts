import {
  HttpError,
  pipeline,
  withBaseUrl,
  withCache,
  withHttpError,
  withJsonResponse,
  withRetry,
} from "fetch-extras";
import { z } from "zod/mini";

import type { HLTBGame } from "../schemas/game";
import { HLTBGameSchema } from "../schemas/game";

const HLTB_API_BASE_URL = "https://hltbapi.codepotatoes.de/";
const RETRY_ATTEMPTS = 4;
// API response 400 when parse fails
const RETRY_STATUS_CODES = [400, 408, 429, 500, 502, 503, 504];
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

const apiFetch = pipeline(
  fetch,
  withBaseUrl(HLTB_API_BASE_URL),
  withRetry({ retries: RETRY_ATTEMPTS, statusCodes: RETRY_STATUS_CODES }),
  withCache({ ttl: CACHE_TTL }),
  withHttpError(),
  withJsonResponse({ schema: z.record(z.string(), z.any()) }),
);

export const getHLTBGameBySteamAppId = async (steamAppId: number): Promise<HLTBGame | null> => {
  try {
    const data = await apiFetch(`steam/${steamAppId}`);
    const result = HLTBGameSchema.safeParse({
      gameId: data.hltbId,
      name: data.title,
      times: {
        mainStory: data.mainStory,
        mainExtras: data.mainStoryWithExtras,
        completionist: data.completionist,
      },
    });

    if (!result.success) {
      throw new Error(`Invalid HLTB game data: ${result.error.message || "validation failed"}`);
    }

    return result.data;
  } catch (error) {
    if (error instanceof HttpError && error.response.status === 404) {
      return null;
    }

    throw error;
  }
};
