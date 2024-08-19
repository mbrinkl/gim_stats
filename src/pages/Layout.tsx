import { Outlet } from "react-router-dom";
import { ISettingsContext, SettingsContext } from "../context";
import { DEFAULT_USERNAMES } from "../config";
import { useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Container, Flex, Link } from "@chakra-ui/react";

export const Layout = () => {
  const [usernames, setUsernames] = useState(DEFAULT_USERNAMES);

  const context: ISettingsContext = {
    usernames,
    setUsernames,
  };

  return (
    <SettingsContext.Provider value={context}>
      <Container maxW="container.xl" h="100dvh" p="1rem">
        <Flex direction="column" justify="space-between" h="100%">
          <Outlet />
          <Link href="https://github.com/mbrinkl/gim_stats" isExternal alignSelf="flex-end">
            Source <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      </Container>
    </SettingsContext.Provider>
  );
};
