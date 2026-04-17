import { browser } from "wxt/browser";
import { defineBackground } from "wxt/utils/define-background";

import { FetchGameMessageSchema, type FetchGameResponse } from "../schemas/message";
import { getHLTBGameBySteamAppId } from "../services/hltb";
import { getErrorMessage } from "../utils/error";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message: unknown, _, sendResponse) => {
    (async () => {
      try {
        const result = FetchGameMessageSchema.safeParse(message);

        if (!result.success) {
          throw new Error(`Invalid message data: ${result.error.message || "validation failed"}`);
        }

        const game = await getHLTBGameBySteamAppId(result.data.steamAppId);

        sendResponse({
          success: true,
          result: game,
        } satisfies FetchGameResponse);
      } catch (error) {
        console.error("[Background] Failed to get game", { error });

        sendResponse({
          success: false,
          error: getErrorMessage(error),
        } satisfies FetchGameResponse);
      }
    })();

    return true;
  });

  browser.action.onClicked.addListener(() => {
    browser.tabs.create({ url: "https://howlongtobeat.com" }).catch((error) => {
      console.error("[Background] Failed to open website", { error });
    });
  });
});
