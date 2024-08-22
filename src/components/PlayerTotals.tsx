import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { combineActivityScore, combineSkillXP, sort } from "../util";
import { CombinedCountGroup, ICombinedHighlighted } from "./CombinedCountGroup";
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
    const result = fuzzysort.go(props.searchedMetric, allCounts, {
      keys: ["metric.name", (obj) => obj.metric.aliases.join()],
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

    const y = result.map((r1) => ({
      obj: r1.obj,
      targ: r1.filter((r2) => !!r2.target),
      isAlias: r1.findIndex((r2) => !!r2.target) === 1,
    }));

    const combinedHighlighted: ICombinedHighlighted[] = y.map((y1) => ({
      ...y1.obj,
      metric: {
        ...y1.obj.metric,
        highlight: {
          value: getHighlight(y1.targ[0]),
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
