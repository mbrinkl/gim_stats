import { EditUsernamesForm } from "../components/EditUsernamesForm";
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
    <Center h="100%" flexDirection="column" gap="1rem" pb="3rem">
      <Text fontSize="xl">Usernames</Text>
      <Center maxW="lg" w="100%">
        <EditUsernamesForm usernames={usernames} onSubmit={onSubmit} />
      </Center>
    </Center>
  );
};

export const Route = createFileRoute("/edit")({
  component: EditPage,
});
