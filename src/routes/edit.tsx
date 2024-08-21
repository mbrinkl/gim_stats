import { UsernameInputs } from "../components/UsernameInputs";
import { DEFAULT_USERNAMES } from "../config";
import { Center, Text } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SortMethod } from "../enums";

const EditPage = () => {
  const { usernames } = Route.useSearch();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    navigate({ to: "/", search: (s) => ({ ...s, usernames: values, sort: s.sort || SortMethod.DEFAULT }) });
  };

  return (
    <Center h="100%" flexDirection="column" gap="1rem">
      <Text fontSize="xl">Usernames</Text>
      <UsernameInputs usernames={usernames} onSubmit={onSubmit} />
    </Center>
  );
};

interface IRouteSearch {
  usernames: string[];
}

export const Route = createFileRoute("/edit")({
  component: EditPage,
  validateSearch: (search: Record<string, unknown>): IRouteSearch => {
    return {
      usernames: (search.usernames as string[]) || DEFAULT_USERNAMES,
    };
  },
});
