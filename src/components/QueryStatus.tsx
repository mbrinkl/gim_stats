import { Flex, Spinner, Text } from "@chakra-ui/react";

interface IQueryStatus {
  username: string;
  isLoading: boolean;
  error: Error | null;
}

export const QueryStatus = (props: IQueryStatus) => {
  if (props.error) {
    return (
      <Text color="red">
        ERROR: {props.username} - {props.error.message}
      </Text>
    );
  }

  if (props.isLoading) {
    return (
      <Flex>
        <Spinner />
        <Text>{props.username}</Text>
      </Flex>
    );
  }

  return <Text color="green">SUCCESS: {props.username}</Text>;
};
