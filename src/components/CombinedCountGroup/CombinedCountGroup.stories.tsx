import { CombinedCountGroup } from "./CombinedCountGroup";
import { ICombined } from "../../types";

export const CombinedCountGroupStory = () => {
  const combinedCounts: ICombined[] = [
    {
      metric: { name: "Chambers of Xeric: Challenge Mode", aliases: [] },
      playerData: [
        {
          username: "WWWWWWWWWWWW",
          count: 99999,
        },
        {
          username: "asdf-asdfas",
          count: 123,
        },
        {
          username: "asdfas-asdf",
          count: 123,
        },
      ],
      total: 1000,
    },
  ];
  return <CombinedCountGroup combinedCounts={combinedCounts} />;
};
