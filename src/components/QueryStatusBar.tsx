import { Spinner } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlayerDetails } from "@wise-old-man/utils";
import { gimUsernames } from "../App";

interface IQueryStatusBarProps {
  queries: UseQueryResult<PlayerDetails, Error>[];
}

export const QueryStatusBar = (props: IQueryStatusBarProps) => {
  return props.queries.map((query, index) => (
    <div>
      {query.isLoading ? (
        <Spinner />
      ) : (
        <span>
          X<span>{gimUsernames[index]}</span>
        </span>
      )}
    </div>
  ));
};
