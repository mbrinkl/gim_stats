import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Combined, SortMethod } from "../types";
import { sort } from "../util";
import { CombinedCountGroup } from "./CombinedCountGroup";

interface TabbedTotalsProps {
  bossCounts: Combined[];
  activityCounts: Combined[];
  skillCounts: Combined[];
  sortMethod: SortMethod;
}

export const TabbedTotals = (props: TabbedTotalsProps) => {
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
