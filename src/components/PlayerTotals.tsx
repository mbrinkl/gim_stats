import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import { combineActivityScore, combineBossKC, combineSkillXP } from "../util";
import { CombinedCountTable } from "./CombinedCountTable";

interface IPlayerTotalsProps {
  players: PlayerDetails[];
}

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const bosses = props.players.map((player) => ({
    username: player.username,
    maps: player.latestSnapshot!.data.bosses,
  }));
  const activities = props.players.map((player) => ({
    username: player.username,
    maps: player.latestSnapshot!.data.activities,
  }));
  const skills = props.players.map((player) => ({
    username: player.username,
    maps: player.latestSnapshot!.data.skills,
  }));

  const bossCounts = combineBossKC(bosses);
  const activityCounts = combineActivityScore(activities);
  const skillCounts = combineSkillXP(skills);

  return (
    <Tabs w="100%" isFitted>
      <TabList>
        <Tab>Bosses</Tab>
        <Tab>Activities</Tab>
        <Tab>Skills</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CombinedCountTable combinedCounts={bossCounts} tableType="Boss" />
        </TabPanel>
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
