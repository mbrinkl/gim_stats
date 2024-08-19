import { Button, Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "../components/PlayerTotals";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "../components/SettingsMenu";
import { useFetchPlayerQueries } from "../api/fetchPlayer";
import { QueryStatusBar } from "../components/QueryStatusBar";
import { useSettingsContext } from "../context";
import { Link as RouterLink } from "react-router-dom";

export const HomePage = () => {
  const { usernames } = useSettingsContext();
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

  const playerQueries = useFetchPlayerQueries(usernames);

  if (!playerQueries.every((query) => query.data)) {
    const retryFailedQueries = () => {
      playerQueries.forEach((query) => {
        if (query.isError) {
          query.refetch();
        }
      });
    };
    const canRetry: boolean =
      playerQueries.some((query) => query.isError) && playerQueries.every((query) => query.isFetched);

    return (
      <VStack>
        <QueryStatusBar queries={playerQueries} usernames={usernames} />
        <Flex align="center" gap="1rem">
          <Link as={RouterLink} to="/usernames">
            Change Usernames
          </Link>
          {canRetry && <Button onClick={retryFailedQueries}>Retry</Button>}
        </Flex>
      </VStack>
    );
  }

  const players = playerQueries.map((query) => query.data!);

  return (
    <VStack gap="1rem">
      <Flex gap="1rem" w="100%">
        <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
        <SettingsMenu sortMethod={sortMethod} onSortMethodChange={setSortMethod} />
      </Flex>
      <PlayerTotals players={players} searchedMetric={searchedMetric} sortMethod={sortMethod} />
    </VStack>
  );
};
