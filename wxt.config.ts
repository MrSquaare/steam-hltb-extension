import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-react"],
  srcDir: "src",
  manifest: ({ browser }) => ({
    name: "Steam HLTB",
    description: "A browser extension to show HowLongToBeat times on Steam game store pages",
    action: {},
    host_permissions: ["https://hltbapi.codepotatoes.de/*"],
    browser_specific_settings:
      browser === "firefox"
        ? {
            gecko: {
              id: "steam-hltb@mrsquaare.fr",
              data_collection_permissions: {
                required: ["browsingActivity"],
              },
            },
          }
        : undefined,
  }),
  autoIcons: {
    baseIconPath: "assets/icon.svg",
  },
  webExt: {
    startUrls: [
      "https://store.steampowered.com/app/1002/Rag_Doll_Kung_Fu/",
      "https://store.steampowered.com/app/220/HalfLife_2/",
      "https://store.steampowered.com/app/70/HalfLife/",
    ],
  },
});
