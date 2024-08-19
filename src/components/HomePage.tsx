import { Button, Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IPlayerDetails } from "../types";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SortMethod } from "../enums";
import { SortMenu } from "./SortMenu";

interface IHomePageProps {
  players: IPlayerDetails[];
  setIsEdit: () => void;
}

export const HomePage = (props: IHomePageProps) => {
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

  return (
    <VStack gap={5} padding={3}>
      <Button onClick={props.setIsEdit}>Edit</Button>
      <Flex gap={1} w="100%">
        <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
        <SortMenu value={sortMethod} onChange={setSortMethod} />
      </Flex>
      <PlayerTotals players={props.players} searchedMetric={searchedMetric} sortMethod={sortMethod} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
