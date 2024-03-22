import { Stat, StatGroup, StatLabel, StatNumber, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import {
  ICombined,
  combineActivityScore,
  combineBossKC,
  combineSkillXP,
  formatBossName,
  formatCount,
  getWomImgUrl,
} from "../util";
import { Image } from "@chakra-ui/react";

interface IPlayerTotalsProps {
  players: PlayerDetails[];
}

interface IXOR {
  combinedCounts: ICombined[];
}

const XOR = (props: IXOR) => {
  return (
    <StatGroup gap={75}>
      {props.combinedCounts.map((combined) => (
        <Stat key={combined.metric}>
          <StatLabel textTransform="capitalize">
            <Image src={getWomImgUrl(combined.metric)} alt="gg" />
            {formatBossName(combined.metric)}
          </StatLabel>
          <StatNumber>{formatCount(combined.count)}</StatNumber>
        </Stat>
      ))}
    </StatGroup>
  );
};

export const PlayerTotals = (props: IPlayerTotalsProps) => {
  const bosses = props.players.map((player) => player.latestSnapshot!.data.bosses);
  const activities = props.players.map((player) => player.latestSnapshot!.data.activities);
  const skills = props.players.map((player) => player.latestSnapshot!.data.skills);

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
          <XOR combinedCounts={bossCounts} />
        </TabPanel>
        <TabPanel>
          <XOR combinedCounts={activityCounts} />
        </TabPanel>
        <TabPanel>
          <XOR combinedCounts={skillCounts} />
        </TabPanel>
      </TabPanels>
    </Tabs>

    // <VStack>
    //   <Text fontSize="x-large">Combined Boss KC</Text>
    //   <StatGroup gap={75}>
    //     {bossCounts.map((boss) => (
    //       <Stat key={boss.metric}>
    //         <StatLabel textTransform="capitalize">
    //           <Image src={getWomImgUrl(boss.metric)} alt="gg" />
    //           {formatBossName(boss.metric)}
    //         </StatLabel>
    //         <StatNumber>{boss.kills}</StatNumber>
    //       </Stat>
    //     ))}
    //   </StatGroup>

    //   <Text fontSize="x-large">Combined Activity Score</Text>
    //   <StatGroup gap={75}>
    //     {activityCounts.map((activity) => (
    //       <Stat key={activity.metric}>
    //         <StatLabel textTransform="capitalize">
    //           <Image src={getWomImgUrl(activity.metric)} alt="gg" />
    //           {formatBossName(activity.metric)}
    //         </StatLabel>
    //         <StatNumber>{activity.score}</StatNumber>
    //       </Stat>
    //     ))}
    //   </StatGroup>
    // </VStack>
  );
};
