import { useQueries } from "@tanstack/react-query";
import { QueryStatusBar } from "./components/QueryStatusBar";
import { PlayerTotals } from "./components/PlayerTotals";
import { Button, Flex, Link, VStack, useDisclosure } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { fetchPlayerDetails } from "./api/womClient";
import { GROUP_USERNAMES } from "./config";
import { PlayerUpdateDrawer } from "./components/PlayerUpdateDrawer";
import { useRef } from "react";

export const App = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const drawerFinalFocusRef = useRef<HTMLButtonElement>(null);

  const playerQueries = useQueries({
    queries: GROUP_USERNAMES.map((username) => {
      return {
        queryKey: ["details", username],
        queryFn: () => fetchPlayerDetails(username),
      };
    }),
  });

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return (
    <VStack gap={3} padding={3}>
      <Flex w="100%" justify="space-between" align="center">
        <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
          Source <ExternalLinkIcon mx="2px" />
        </Link>
        <Button ref={drawerFinalFocusRef} onClick={onDrawerOpen}>
          Players Info
        </Button>
      </Flex>
      <PlayerTotals players={players} />
      <PlayerUpdateDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        finalFocusRef={drawerFinalFocusRef}
        players={players}
      />
    </VStack>
  );
};
