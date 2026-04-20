import { type FC } from "react";

import type { HLTBGame } from "../schemas/game";
import { formatHours } from "../utils/time";

export type HLTBGlanceProps = {
  game: HLTBGame;
};

export const HLTBGlance: FC<HLTBGlanceProps> = ({ game }) => {
  return (
    <div id={"hltb-glance"} className={"dev_row"} style={{ marginTop: "10px" }}>
      <div className={"subtitle column"}>HowLongToBeat:</div>
      <div style={{ color: "#8f98a0" }}>
        {`Main Story: ${formatHours(game.times.mainStory)}`}
        <br />
        {`Main + Sides: ${formatHours(game.times.mainExtras)}`}
        <br />
        {`Completionist: ${formatHours(game.times.completionist)}`}
      </div>
    </div>
  );
};
