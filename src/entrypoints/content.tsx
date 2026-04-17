import { createRoot } from "react-dom/client";
import { browser } from "wxt/browser";
import type { ContentScriptContext } from "wxt/utils/content-script-context";
import { defineContentScript } from "wxt/utils/define-content-script";

import { HLTBButton } from "../components/HLTBButton";
import { HLTBGlance } from "../components/HLTBGlance";
import { FetchGameResponseSchema } from "../schemas/message";
import { getSteamAppIdFromPathname } from "../utils/steam";

export default defineContentScript({
  matches: ["*://store.steampowered.com/app/*"],
  runAt: "document_idle",
  async main(ctx: ContentScriptContext) {
    const steamAppId = getSteamAppIdFromPathname(window.location.pathname);

    if (!steamAppId) {
      return;
    }

    try {
      const response = await browser.runtime.sendMessage({
        type: "hltb-fetch-game",
        steamAppId,
      });
      const result = FetchGameResponseSchema.safeParse(response);

      if (!result.success) {
        throw new Error(`Invalid response data: ${result.error.message || "validation failed"}`);
      }

      if (!result.data.success) {
        throw new Error(result.data.error);
      }

      if (!result.data.result) {
        throw new Error("Game not found");
      }

      const game = result.data.result;
      const hltbLink = `https://howlongtobeat.com/game/${game.gameId}`;

      const glance = createIntegratedUi(ctx, {
        anchor: "#glanceMidCtn .dev_row:last-child",
        append: "after",
        position: "inline",
        onMount: (container) => {
          container.style.display = "contents";

          const root = createRoot(container);

          root.render(<HLTBGlance game={game} />);

          return root;
        },
        onRemove: (root) => root?.unmount(),
      });

      glance.mount();

      const button = createIntegratedUi(ctx, {
        anchor: ".apphub_OtherSiteInfo",
        append: "first",
        position: "inline",
        onMount: (container) => {
          container.style.display = "contents";

          const root = createRoot(container);

          root.render(<HLTBButton link={hltbLink} />);

          return root;
        },
        onRemove: (root) => root?.unmount(),
      });

      button.mount();
    } catch (error) {
      console.error("[Content] Failed to fetch game", { error });
    }
  },
});
