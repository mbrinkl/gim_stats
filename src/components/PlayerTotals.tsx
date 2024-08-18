import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP, sort } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { IPlayerDetails } from "../types";
import { useMemo } from "react";
import { SortMethod } from "../enums";
import fuzzysort from "fuzzysort";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
  searchedMetric: string;
  sortMethod: SortMethod;
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const skillCounts = useMemo(
    () => sort(combineSkillXP(props.players), props.sortMethod),
    [props.players, props.sortMethod],
  );
  const [bossCounts, activityCounts] = useMemo(() => {
    // Osrs API combines activities and bosses as one group, so split them up
    const activityAndBossCounts = combineActivityScore(props.players);
    const firstBoss = "Abyssal Sire";
    const firstBossIndex = activityAndBossCounts.findIndex((x) => x.metric.name === firstBoss);
    const splicedBossCounts = activityAndBossCounts.splice(firstBossIndex);
    return [sort(splicedBossCounts, props.sortMethod), sort(activityAndBossCounts, props.sortMethod)];
  }, [props.players, props.sortMethod]);

  if (props.searchedMetric) {
    const searchable = bossCounts.concat(activityCounts).concat(skillCounts);

    const result = fuzzysort.go(props.searchedMetric.toLowerCase(), searchable, {
      keys: ["metric.name", (obj) => obj.metric.aliases.join()],
      threshold: 0.25,
    });

    if (result.length === 0) {
      return <Text>No Results.</Text>;
    }

    return <CombinedCountGroup combinedCounts={result.map((r) => r.obj)} />;
  }

  return (
    <Tabs w="100%" isFitted>
      <TabList>
        <Tab>Bosses</Tab>
        <Tab>Activities</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CombinedCountGroup combinedCounts={bossCounts} />
        </TabPanel>
        <TabPanel>
          <CombinedCountGroup combinedCounts={activityCounts} />
        </TabPanel>
        <TabPanel>
          <CombinedCountGroup combinedCounts={skillCounts} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
