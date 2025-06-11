import { Button, Center, Flex, Text, Stack, Anchor } from "@mantine/core";
import { PlayerTotals } from "../components/PlayerTotals";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { SettingsMenu } from "../components/SettingsMenu";
import { fetchPlayerQueryOpts } from "../api";
import { ErrorComponentProps, Link as RouterLink, useNavigate, useRouter } from "@tanstack/react-router"
import { PlayerDetails, SortMethod } from "../types";

const HomePage = () => {
  const [searchedMetric, setSearchedMetric] = useState("");
  const players = Route.useLoaderData();
  const { sort: sortMethod } = Route.useSearch();
  const navigate = useNavigate();

  const setSortMethod = (value: SortMethod) => {
    navigate({ search: (prev) => ({ ...prev, sort: value }) });
  };

  return (
    <Stack gap="1rem">
      <Flex gap="1rem" w="100%" align="center">
        <SearchBar value={searchedMetric} onChange={setSearchedMetric} />
        <SettingsMenu sortMethod={sortMethod} onSortMethodChange={setSortMethod} />
      </Flex>
      <PlayerTotals players={players} searchedMetric={searchedMetric} sortMethod={sortMethod} />
    </Stack>
  );
};

const HomePageError = (props: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <Center h="100%" style={{ flexDirection: "column", gap: "2rem" }}>
      {props.error.message.split(",").map((err, index) => (
        <Text key={index}>{err}</Text>
      ))}
      <Flex align="center" gap="2rem">
        <Anchor component={RouterLink} to="/edit" search={true}>
          Change Usernames
        </Anchor>
        <Button onClick={router.invalidate}>Retry</Button>
      </Flex>
    </Center>
  );
};

export const Route = createFileRoute({
  component: HomePage,
  loaderDeps: ({ search: { usernames } }) => ({ usernames }),
  loader: async ({ context: { queryClient }, deps: { usernames } }) => {
    const queries = usernames.map((u) => queryClient.ensureQueryData(fetchPlayerQueryOpts(u)));
    const results = await Promise.allSettled(queries);
    if (results.some((r) => r.status === "rejected")) {
      const errors = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
      throw new Error(errors.join());
    }
    return results.map((r) => (r as PromiseFulfilledResult<PlayerDetails>).value);
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: HomePageError,
});
