import { SortMethod } from "../enums";

export interface SearchParams {
  usernames: string[];
  sort: SortMethod;
  error?: boolean;
}
