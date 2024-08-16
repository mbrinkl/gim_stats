import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { ICombined, IPlayerDetails } from "../types";
import { useMemo } from "react";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
  searchedMetric: string;
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const skillCounts = useMemo(() => combineSkillXP(props.players), [props.players]);
  const [bossCounts, activityCounts] = useMemo(() => {
    // Osrs API combines activities and bosses as one group, so split them up
    const activityAndBossCounts = combineActivityScore(props.players);
    const firstBoss = "Abyssal Sire";
    const firstBossIndex = activityAndBossCounts.findIndex((x) => x.metric === firstBoss);
    const splicedBossCounts = activityAndBossCounts.splice(firstBossIndex);
    return [splicedBossCounts, activityAndBossCounts];
  }, [props.players]);

  if (props.searchedMetric) {
    const matches: ICombined[] = [];

    bossCounts
      .concat(activityCounts)
      .concat(skillCounts)
      .forEach((item) => {
        if (item.metric.toLowerCase().includes(props.searchedMetric.toLowerCase())) {
          matches.push(item);
        }
        // TODO: or if an alias matches, ie. 'bandos' should match 'general graardor'
      });

    if (matches.length === 0) {
      return <Text>No Results.</Text>;
    }

    return <CombinedCountGroup combinedCounts={matches} />;
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
