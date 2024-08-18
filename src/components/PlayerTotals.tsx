import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP, sort } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { ICombined, IPlayerDetails } from "../types";
import { useMemo } from "react";
import { SortMethod } from "../enums";
import fuzzysort from "fuzzysort";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
  searchedMetric: string;
  sortMethod: SortMethod;
}

interface ITabbedTotals {
  bossCounts: ICombined[];
  activityCounts: ICombined[];
  skillCounts: ICombined[];
  sortMethod: SortMethod;
}

const TabbedTotals = (props: ITabbedTotals) => {
  return (
    <Tabs w="100%" isFitted>
      <TabList>
        <Tab>Bosses</Tab>
        <Tab>Activities</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CombinedCountGroup combinedCounts={sort(props.bossCounts, props.sortMethod)} />
        </TabPanel>
        <TabPanel>
          <CombinedCountGroup combinedCounts={sort(props.activityCounts, props.sortMethod)} />
        </TabPanel>
        <TabPanel>
          <CombinedCountGroup combinedCounts={sort(props.skillCounts, props.sortMethod)} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const [bossCounts, activityCounts, skillCounts, allCounts] = useMemo(() => {
    // Osrs API combines activities and bosses as one group, so split them up
    const activityAndBossCounts = combineActivityScore(props.players);
    const firstBoss = "Abyssal Sire";
    const firstBossIndex = activityAndBossCounts.findIndex((x) => x.metric.name === firstBoss);
    const splicedBossCounts = activityAndBossCounts.splice(firstBossIndex);
    const combinedSkills = combineSkillXP(props.players);
    const all = splicedBossCounts.concat(activityAndBossCounts).concat(combinedSkills);
    return [splicedBossCounts, activityAndBossCounts, combinedSkills, all];
  }, [props.players]);

  if (props.searchedMetric) {
    const result = fuzzysort.go(props.searchedMetric.toLowerCase(), allCounts, {
      keys: ["metric.name", (obj) => obj.metric.aliases.join()],
      threshold: 0.5,
    });

    if (result.length === 0) {
      return <Text>No Results.</Text>;
    }

    return <CombinedCountGroup combinedCounts={result.map((r) => r.obj)} />;
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
