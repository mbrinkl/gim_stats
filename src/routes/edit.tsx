import { EditUsernamesForm } from "../components/EditUsernamesForm";
import { Center } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

const EditPage = () => {
  const { usernames } = Route.useSearch();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    navigate({ to: "/", search: (s) => ({ ...s, usernames: values, sort: s.sort || "default" }) });
  };

  return (
    <Center h="100%" py="3rem">
      <Center w="100%" style={{ maxWidth: "500px" }}>
        <EditUsernamesForm usernames={usernames} onSubmit={onSubmit} />
      </Center>
    </Center>
  );
};

export const Route = createFileRoute("/edit")({
  component: EditPage,
});
