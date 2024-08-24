import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { SortMethod } from "../enums";
import { ICombined } from "../types";
import { sort } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";

interface ITabbedTotals {
  bossCounts: ICombined[];
  activityCounts: ICombined[];
  skillCounts: ICombined[];
  sortMethod: SortMethod;
}

export const TabbedTotals = (props: ITabbedTotals) => {
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
