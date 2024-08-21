import { UsernameInputs } from "../components/UsernameInputs";
import { DEFAULT_USERNAMES } from "../config";
import { Center, Text } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IRouteSearch } from "../types";

const UsernamesPage = () => {
  const { usernames } = Route.useSearch();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    navigate({ to: "/", search: { usernames: values } });
  };

  return (
    <Center h="100%" flexDirection="column" gap="1rem">
      <Text fontSize="xl">Usernames</Text>
      <UsernameInputs usernames={usernames} onSubmit={onSubmit} />
    </Center>
  );
};

export const Route = createFileRoute("/edit")({
  component: UsernamesPage,
  validateSearch: (search: Record<string, unknown>): IRouteSearch => {
    return {
      usernames: (search.usernames as string[]) || DEFAULT_USERNAMES,
    };
  },
});
