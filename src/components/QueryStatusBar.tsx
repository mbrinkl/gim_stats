import { Flex, Spinner, Text } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlayerDetails } from "@wise-old-man/utils";
import { GROUP_USERNAMES } from "../config";

interface IQueryStatusBarProps {
  queries: UseQueryResult<PlayerDetails, Error>[];
}

interface IQueryStatus {
  username: string;
  isLoading: boolean;
  isError: boolean;
}

const QueryStatus = (props: IQueryStatus) => {
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

export const QueryStatusBar = (props: IQueryStatusBarProps) => {
  return props.queries.map((query, index) => (
    <QueryStatus
      key={GROUP_USERNAMES[index]}
      username={GROUP_USERNAMES[index]}
      isLoading={query.isLoading}
      isError={query.isError}
    />
  ));
};
