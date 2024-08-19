import { Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IPlayerDetails } from "../types";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "./SettingsMenu";

interface IHomePageProps {
  players: IPlayerDetails[];
  setIsEdit: () => void;
}

export const HomePage = (props: IHomePageProps) => {
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

  return (
    <VStack gap={5} padding={3}>
      <Flex gap={1} w="100%">
        <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
        <SettingsMenu
          sortMethod={sortMethod}
          onSortMethodChange={setSortMethod}
          onChangeUsernamesClick={props.setIsEdit}
        />
      </Flex>
      <PlayerTotals players={props.players} searchedMetric={searchedMetric} sortMethod={sortMethod} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
