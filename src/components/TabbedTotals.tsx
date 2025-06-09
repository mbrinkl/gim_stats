import { Tabs } from "@mantine/core";
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
    <Tabs w="100%" defaultValue="bosses">
      <Tabs.List grow>
        <Tabs.Tab value="bosses">Bosses</Tabs.Tab>
        <Tabs.Tab value="activities">Activities</Tabs.Tab>
        <Tabs.Tab value="skills">Skills</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="bosses">
        <CombinedCountGroup combinedCounts={sort(props.bossCounts, props.sortMethod)} />
      </Tabs.Panel>
      <Tabs.Panel value="activities">
        <CombinedCountGroup combinedCounts={sort(props.activityCounts, props.sortMethod)} />
      </Tabs.Panel>
      <Tabs.Panel value="skills">
        <CombinedCountGroup combinedCounts={sort(props.skillCounts, props.sortMethod)} />
      </Tabs.Panel>
    </Tabs>
  );
};
