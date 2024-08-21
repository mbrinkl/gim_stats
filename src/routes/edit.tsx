import { UsernameInputs } from "../components/UsernameInputs";
import { DEFAULT_USERNAMES } from "../config";
import { Text, VStack } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IRouteSearch } from "../types";

const UsernamesPage = () => {
  const { usernames } = Route.useSearch();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    navigate({ to: "/", search: { usernames: values } });
  };

  return (
    <VStack>
      <Text fontSize="xl">Usernames</Text>
      <UsernameInputs usernames={usernames} onSubmit={onSubmit} />
    </VStack>
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
