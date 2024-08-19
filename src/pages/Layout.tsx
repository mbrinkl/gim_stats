import { Outlet } from "react-router-dom";
import { ISettingsContext, SettingsContext } from "../context";
import { DEFAULT_USERNAMES } from "../config";
import { useState } from "react";

// global settings needs...
// usernames / set usernames / players obj

export const Layout = () => {
  const [usernames, setUsernames] = useState(DEFAULT_USERNAMES);

  const context: ISettingsContext = {
    usernames,
    setUsernames,
  };

  return (
    <SettingsContext.Provider value={context}>
      <Outlet />
    </SettingsContext.Provider>
  );
};
