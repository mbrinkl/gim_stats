import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP } from "../util";
import { CombinedCountTable } from "./CombinedCountTable";
import { IPlayerDetails } from "../types/osrsApiTypes";

interface IPlayerTotalsProps {
  players: IPlayerDetails[];
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  // const bossCounts = combineBossKC(props.players);
  const activityCounts = combineActivityScore(props.players);
  const skillCounts = combineSkillXP(props.players);

  return (
    <Tabs w="100%" isFitted>
      <TabList>
        {/* <Tab>Bosses</Tab> */}
        <Tab>Bosses / Activities</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanels>
        {/* <TabPanel>
          <CombinedCountTable combinedCounts={bossCounts} tableType="Boss" />
        </TabPanel> */}
        <TabPanel>
          <CombinedCountTable combinedCounts={activityCounts} tableType="Activity" />
        </TabPanel>
        <TabPanel>
          <CombinedCountTable combinedCounts={skillCounts} tableType="Skill" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
