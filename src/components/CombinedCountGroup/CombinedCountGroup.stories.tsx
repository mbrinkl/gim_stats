import { CombinedCountGroup } from "./CombinedCountGroup";
import { Combined } from "../../types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const CombinedCountGroupStory = () => {
  const combinedCounts: Combined[] = [
    {
      metric: { name: "Chambers of Xeric", aliases: [] },
      playerData: [
        {
          username: "WWWWWWWWWWWW",
          count: 99999,
        },
        {
          username: "WWWWWWWWWWWW",
          count: 4_600_000_000,
        },
        {
          username: "asdfas-asdf",
          count: 345,
        },
      ],
      total: 1000,
    },
    {
      metric: { name: "Clue Scrolls: Easy", aliases: [] },
      playerData: [
        {
          username: "a",
          count: 1,
        },
        {
          username: "b",
          count: 2,
        },
      ],
      total: 1000,
    },
    {
      metric: { name: "Strength", aliases: [] },
      playerData: [
        {
          username: "WWWWWWWWWWWW",
          count: 99999,
          level: 99,
        },
        {
          username: "WWWWWWWWWWWW",
          count: 4_600_000_000,
          level: 10,
        },
        {
          username: "asdfas-asdf",
          count: 123,
          level: 1,
        },
      ],
      total: 1000,
    },
  ];
  return <CombinedCountGroup combinedCounts={combinedCounts} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Combined Count Group",
  component: CombinedCountGroupStory,
} satisfies Meta<typeof CombinedCountGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
