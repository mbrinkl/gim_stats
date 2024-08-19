import { Outlet } from "react-router-dom";
import { ISettingsContext, SettingsContext } from "../context";
import { DEFAULT_USERNAMES } from "../config";
import { useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, VStack } from "@chakra-ui/react";

export const Layout = () => {
  const [usernames, setUsernames] = useState(DEFAULT_USERNAMES);

  const context: ISettingsContext = {
    usernames,
    setUsernames,
  };

  return (
    <SettingsContext.Provider value={context}>
      <VStack>
        <Outlet />
        <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
          Source <ExternalLinkIcon mx="2px" />
        </Link>
      </VStack>
    </SettingsContext.Provider>
  );
};
