import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchBar } from "./SearchBar";

const SearchBarStory = () => {
  const [val, setVal] = useState("");
  return <SearchBar value={val} onChange={setVal} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "SearchBar",
  component: SearchBarStory,
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
