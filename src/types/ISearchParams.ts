import { SortMethod } from "../enums";

export interface ISearchParams {
  usernames: string[];
  sort: SortMethod;
  error?: boolean;
}
