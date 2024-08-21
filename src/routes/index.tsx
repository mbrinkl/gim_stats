import { Button, Center, Flex, Link, Text, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "../components/PlayerTotals";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SortMethod } from "../enums";
import { SettingsMenu } from "../components/SettingsMenu";
import { fetchPlayerQueryOpts } from "../api";
import {
  ErrorComponentProps,
  Link as RouterLink,
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { DEFAULT_USERNAMES } from "../config";
import { IPlayerDetails } from "../types";

const HomePage = () => {
  const [searchedMetric, setSearchedMetric] = useState("");
  const players = Route.useLoaderData();
  const { sort: sortMethod } = Route.useSearch();
  const navigate = useNavigate();

  const setSortMethod = (value: SortMethod) => {
    navigate({ search: (prev) => ({ ...prev, sort: value }) });
  };

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
    <Center h="100%" flexDirection="column" gap="2rem">
      {props.error.message.split(",").map((err, index) => (
        <Text key={index}>{err}</Text>
      ))}
      <Flex alignItems="center" gap="2rem">
        <Link color="teal.500" as={RouterLink} to="/edit" search={true}>
          Change Usernames
        </Link>
        <Button onClick={router.invalidate}>Retry</Button>
      </Flex>
    </Center>
  );
};

interface IRouteSearch {
  usernames: string[];
  sort: SortMethod;
}

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): IRouteSearch => {
    return {
      sort: (search.sort as SortMethod) || SortMethod.DEFAULT,
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
