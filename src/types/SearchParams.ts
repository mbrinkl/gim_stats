import { SortMethod } from "./schema";

export interface SearchParams {
  usernames: string[];
  sort: SortMethod;
}
