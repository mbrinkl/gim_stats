import { Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "../components/PlayerTotals";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "../components/SettingsMenu";
import { useFetchPlayerQueries } from "../api/fetchPlayer";
import { QueryStatusBar } from "../components/QueryStatusBar";
import { useSettingsContext } from "../context";

export const HomePage = () => {
  const { usernames } = useSettingsContext();
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

  const playerQueries = useFetchPlayerQueries(usernames);

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} usernames={usernames} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return (
    <VStack gap={5} padding={3}>
      <Flex gap={1} w="100%">
        <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
        <SettingsMenu sortMethod={sortMethod} onSortMethodChange={setSortMethod} />
      </Flex>
      <PlayerTotals players={players} searchedMetric={searchedMetric} sortMethod={sortMethod} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
