import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";
import { IPlayerDetails } from "../types";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const activityCounts = combineActivityScore(props.players);
  const skillCounts = combineSkillXP(props.players);

  return (
    <Tabs w="100%" isFitted>
      <TabList>
        <Tab>Bosses / Activities</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanels>
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
