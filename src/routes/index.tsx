import { Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "../components/PlayerTotals";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "../components/SettingsMenu";
import { fetchPlayerQueryOpts } from "../api/fetchPlayer";
import { ErrorComponentProps, Link as RouterLink, createFileRoute, useRouter } from "@tanstack/react-router";
import { DEFAULT_USERNAMES } from "../config";
import { IPlayerDetails, IRouteSearch } from "../types";

const HomePage = () => {
  const players = Route.useLoaderData();
  const [searchedMetric, setSearchedMetric] = useState("");
  const [sortMethod, setSortMethod] = useState(SortMethod.DEFAULT);

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

const HomePageError = (props: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <div>
      {props.error.message.split(",").map((err, index) => (
        <div key={index}>{err}</div>
      ))}
      <Link as={RouterLink} to="/edit" search={true}>
        Change Usernames
      </Link>
      <button onClick={router.invalidate}>Retry</button>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): IRouteSearch => {
    return {
      usernames: (search.usernames as string[]) || DEFAULT_USERNAMES,
    };
  },
  loaderDeps: ({ search: { usernames } }) => ({ usernames }),
  loader: async ({ context: { queryClient }, deps: { usernames } }) => {
    const queries = usernames.map((u) => queryClient.ensureQueryData(fetchPlayerQueryOpts(u)));
    const results = await Promise.allSettled(queries);
    if (results.some((r) => r.status === "rejected")) {
      const errors = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
      throw new Error(errors.join());
    }
    return results.map((r) => (r as PromiseFulfilledResult<IPlayerDetails>).value);
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 0,
  errorComponent: HomePageError,
});
