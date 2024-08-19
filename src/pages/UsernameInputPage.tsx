import { useNavigate } from "react-router-dom";
import { UsernameInputs } from "../components/UsernameInputs";
import { useSettingsContext } from "../context";
import { Text, VStack } from "@chakra-ui/react";

export const UsernameInputPage = () => {
  const { usernames, setUsernames } = useSettingsContext();
  const navigate = useNavigate();

  const onSubmit = (values: string[]) => {
    setUsernames(values);
    navigate("/");
  };

  return (
    <VStack>
      <Text fontSize="xl">Usernames</Text>
      <UsernameInputs usernames={usernames} onSubmit={onSubmit} />
    </VStack>
  );
};
