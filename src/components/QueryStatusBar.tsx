import { UseQueryResult } from "@tanstack/react-query";
import { IPlayerDetails } from "../types";
import { QueryStatus } from "./QueryStatus";

interface IQueryStatusBarProps {
  queries: UseQueryResult<IPlayerDetails, Error>[];
  usernames: string[];
}

export const QueryStatusBar = (props: IQueryStatusBarProps) => {
  return props.queries.map((query, index) => (
    <QueryStatus
      key={props.usernames[index]}
      username={props.usernames[index]}
      isLoading={query.isLoading}
      error={query.error}
    />
  ));
};
