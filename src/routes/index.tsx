import { Button, Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "../components/PlayerTotals";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "../components/SettingsMenu";
import { fetchPlayerQueryOpts } from "../api/fetchPlayer";
import { QueryStatusBar } from "../components/QueryStatusBar";
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router";
import { DEFAULT_USERNAMES } from "../config";
import { EnsureQueryDataOptions, QueryOptions } from "@tanstack/react-query";
import { IPlayerDetails, IRouteSearch } from "../types";

const HomePage = () => {
  const players = Route.useLoaderData();
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

  // const playerQueries = useFetchPlayerQueries(usernames);

  // if (!playerQueries.every((query) => query.data)) {
  //   const retryFailedQueries = () => {
  //     playerQueries.forEach((query) => {
  //       if (query.isError) {
  //         query.refetch();
  //       }
  //     });
  //   };
  //   const canRetry: boolean =
  //     playerQueries.some((query) => query.isError) && playerQueries.every((query) => query.isFetched);

  //   return (
  //     <VStack>
  //       <QueryStatusBar queries={playerQueries} usernames={usernames} />
  //       <Flex align="center" gap="1rem">
  //         <Link as={RouterLink} to="/usernames">
  //           Change Usernames
  //         </Link>
  //         {canRetry && <Button onClick={retryFailedQueries}>Retry</Button>}
  //       </Flex>
  //     </VStack>
  //   );
  // }

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

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): IRouteSearch => {
    return {
      usernames: search.usernames as string[],
    };
  },
  loaderDeps: ({ search: { usernames } }) => ({ usernames }),
  loader: ({ context: { queryClient }, deps }) => {
    const usernames = deps.usernames?.length ? deps.usernames : DEFAULT_USERNAMES;
    return Promise.all(usernames.map((u) => queryClient.ensureQueryData(fetchPlayerQueryOpts(u))));
  },
});
