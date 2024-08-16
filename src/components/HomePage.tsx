import { Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IPlayerDetails } from "../types";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

interface IHomePageProps {
  players: IPlayerDetails[];
}

export const HomePage = (props: IHomePageProps) => {
  const [searchedMetric, setSearchedMetric] = useState("");
  return (
    <VStack gap={5} padding={3}>
      <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
      <PlayerTotals players={props.players} searchedMetric={searchedMetric} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
