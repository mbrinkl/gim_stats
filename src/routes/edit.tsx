import { EditUsernamesForm } from "../components/EditUsernamesForm";
import { Center } from "@chakra-ui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

const EditPage = () => {
  const { usernames } = Route.useSearch();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    navigate({ to: "/", search: (s) => ({ ...s, usernames: values, sort: s.sort || "default" }) });
  };

  return (
    <Center h="100%" py="3rem">
      <Center maxW="lg" w="100%">
        <EditUsernamesForm usernames={usernames} onSubmit={onSubmit} />
      </Center>
    </Center>
  );
};

export const Route = createFileRoute("/edit")({
  component: EditPage,
});
