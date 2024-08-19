import { createContext, useContext } from "react";

export interface ISettingsContext {
  usernames: string[];
  setUsernames: (usernames: string[]) => void;
}

export const SettingsContext = createContext<ISettingsContext>({ usernames: [], setUsernames: () => {} });
export const useSettingsContext = () => useContext(SettingsContext);
