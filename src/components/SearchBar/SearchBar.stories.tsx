import { useState } from "react";
import { SearchBar } from "./SearchBar";

export const SearchBarStory = () => {
  const [val, setVal] = useState("");
  return <SearchBar value={val} onChange={setVal} />;
};
