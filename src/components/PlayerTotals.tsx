import { Stat, StatGroup, StatLabel, StatNumber, Text, VStack } from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import { combineCounts, formatBossName, getWomImgUrl } from "../util";
import { Image } from "@chakra-ui/react";

interface IPlayerTotalsProps {
  players: PlayerDetails[];
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const bosses = props.players.map((player) => player.latestSnapshot!.data.bosses);
  const activities = props.players.map((player) => player.latestSnapshot!.data.activities);

  const bossCounts = combineCounts(bosses, "kills");
  const activityCounts = combineCounts(activities, "score");

  return (
    <VStack>
      <Text fontSize="x-large">Combined Boss KC</Text>
      <StatGroup gap={75}>
        {bossCounts.map((boss) => (
          <Stat key={boss.metric}>
            <StatLabel textTransform="capitalize">
              <Image src={getWomImgUrl(boss.metric)} alt="gg" />
              {formatBossName(boss.metric)}
            </StatLabel>
            <StatNumber>{boss.kills}</StatNumber>
          </Stat>
        ))}
      </StatGroup>

      <Text fontSize="x-large">Combined Activity Score</Text>
      <StatGroup gap={75}>
        {activityCounts.map((activity) => (
          <Stat key={activity.metric}>
            <StatLabel textTransform="capitalize">
              <Image src={getWomImgUrl(activity.metric)} alt="gg" />
              {formatBossName(activity.metric)}
            </StatLabel>
            <StatNumber>{activity.score}</StatNumber>
          </Stat>
        ))}
      </StatGroup>
    </VStack>
  );
};
