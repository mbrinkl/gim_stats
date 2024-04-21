import { Flex, Spinner, Text } from "@chakra-ui/react";

interface IQueryStatus {
  username: string;
  isLoading: boolean;
  isError: boolean;
}

export const QueryStatus = (props: IQueryStatus) => {
  if (props.isError) {
    return <Text color="red">ERROR: {props.username}</Text>;
  }

  if (props.isLoading) {
    return (
      <Flex>
        <Spinner />
        <Text>{props.username}</Text>
      </Flex>
    );
  }

  return <Flex color="green">SUCCESS: {props.username}</Flex>;
};
