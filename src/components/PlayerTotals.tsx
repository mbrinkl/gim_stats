import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import { BossValue, PlayerDetails } from "@wise-old-man/utils";
import { formatBossName, normalizeKillCount } from "../util";

interface IPlayerTotalsProps {
  players: PlayerDetails[];
}

type BossSummary = Pick<BossValue, "metric" | "kills">;

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const bosses = props.players.map((player) => player.latestSnapshot!.data.bosses);
  const flat = bosses.flatMap((x) =>
    Object.values(x).map<BossSummary>((y) => ({ metric: y.metric, kills: normalizeKillCount(y.kills) })),
  );

  const summed: BossSummary[] = [];
  flat.forEach((boss) => {
    const index = summed.map((s) => s.metric).indexOf(boss.metric);
    if (index === -1) {
      summed.push(boss);
    } else {
      summed[index].kills += boss.kills;
    }
  });

  return (
    <StatGroup gap={75}>
      {summed.map((boss) => (
        <Stat w={1000}>
          <StatLabel textTransform="capitalize">{formatBossName(boss.metric)}</StatLabel>
          <StatNumber>{boss.kills}</StatNumber>
        </Stat>
      ))}
    </StatGroup>
  );
};
