import { UseQueryResult } from "@tanstack/react-query";
import { GROUP_USERNAMES } from "../config";
import { IPlayerDetails } from "../types";
import { QueryStatus } from "./QueryStatus";

interface IQueryStatusBarProps {
  queries: UseQueryResult<IPlayerDetails, Error>[];
}

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
