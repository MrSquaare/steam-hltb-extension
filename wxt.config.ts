import { defineConfig } from "wxt";

export default defineConfig({
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-react"],
  srcDir: "src",
  manifest: {
    name: "Steam HLTB",
    description: "A browser extension to show HowLongToBeat times on Steam game store pages",
    action: {},
    host_permissions: ["https://hltbapi.codepotatoes.de/*"],
    browser_specific_settings: {
      gecko: {
        data_collection_permissions: {
          required: ["browsingActivity"],
        },
      },
    },
  },
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
