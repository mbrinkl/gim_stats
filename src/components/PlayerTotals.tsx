import { Text } from "@chakra-ui/react";
import { combine } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { Combined, PlayerDetails } from "../types";
import { useMemo } from "react";
import { SortMethod } from "../enums";
import fuzzysort from "fuzzysort";
import { TabbedTotals } from "./TabbedTotals";

interface PlayerTotalsProps {
  players: PlayerDetails[];
  searchedMetric: string;
  sortMethod: SortMethod;
}

export const PlayerTotals = (props: PlayerTotalsProps) => {
  const [bossCounts, activityCounts, skillCounts, allCounts] = useMemo(() => {
    // Osrs API combines activities and bosses as one group, so split them up
    const activityAndBossCounts = combine(props.players, "activities");
    const firstBoss = "Abyssal Sire";
    const firstBossIndex = activityAndBossCounts.findIndex((x) => x.metric.name === firstBoss);
    const splicedBossCounts = activityAndBossCounts.splice(firstBossIndex);
    const combinedSkills = combine(props.players, "skills");
    const all = splicedBossCounts.concat(activityAndBossCounts).concat(combinedSkills);
    return [splicedBossCounts, activityAndBossCounts, combinedSkills, all];
  }, [props.players]);

  // def cringe but set separate keys for each alias so that only the matched alias
  // is highlighted - add keys for alias indices equal to the max alias length
  // to hit all aliases, but this adds unnecessary keys to objects that dont have
  // the max number of aliases - seems to be negligable in terms of performance
  const maxNumAliases = useMemo(() => {
    return Math.max(...allCounts.map((c) => c.metric.aliases.length));
  }, [allCounts]);

  if (props.searchedMetric) {
    const result = fuzzysort.go(props.searchedMetric, allCounts, {
      keys: ["metric.name", ...Array.from(Array(maxNumAliases), (_, i) => `metric.aliases.${i}`)],
      threshold: 0.5,
    });

    if (result.length === 0) {
      return <Text>No Results.</Text>;
    }

    const getHighlight = (resy: Fuzzysort.Result) => {
      const h = resy.highlight((m, i) => (
        <Text key={i} as="span" color="red">
          {m}
        </Text>
      ));
      return <Text as="span">{h}</Text>;
    };

    const y = result.map((r1) => {
      const maxScoreIndex = r1.reduce((iMax, x, i, arr) => (x.score > arr[iMax].score ? i : iMax), 0);
      return {
        obj: r1.obj,
        targ: r1[maxScoreIndex],
        isAlias: maxScoreIndex > 0,
      };
    });

    const combinedHighlighted: Combined[] = y.map((y1) => ({
      ...y1.obj,
      metric: {
        ...y1.obj.metric,
        highlight: {
          value: getHighlight(y1.targ),
          isAlias: y1.isAlias,
        },
      },
    }));

    return <CombinedCountGroup combinedCounts={combinedHighlighted} />;
  }

  return (
    <TabbedTotals
      bossCounts={bossCounts}
      activityCounts={activityCounts}
      skillCounts={skillCounts}
      sortMethod={props.sortMethod}
    />
  );
};
