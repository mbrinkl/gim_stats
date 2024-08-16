import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { ICombined, IPlayerDetails } from "../types";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
  searchedMetric: string;
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  // should probably be memoized
  const activityCounts = combineActivityScore(props.players);
  const skillCounts = combineSkillXP(props.players);

  // Osrs API combines activities and bosses as one group, so split them up
  const firstBoss = "Abyssal Sire";
  const firstBossIndex = activityCounts.findIndex((x) => x.metric === firstBoss);
  const bossCounts = activityCounts.splice(firstBossIndex);

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
