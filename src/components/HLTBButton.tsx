import { type FC } from "react";

export type HLTBButtonProps = {
  link: string;
};

export const HLTBButton: FC<HLTBButtonProps> = ({ link }) => {
  return (
    <a
      id={"hltb-button"}
      className={"btnv6_blue_hoverfade btn_medium"}
      style={{ marginRight: "3px" }}
      href={link}
      target={"_blank"}
      rel={"noopener noreferrer"}
    >
      <span>HowLongToBeat</span>
    </a>
  );
};
