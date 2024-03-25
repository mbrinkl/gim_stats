import { Button, Flex, Link, VStack, useDisclosure } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { PlayerUpdateDrawer } from "./PlayerUpdateDrawer";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { PlayerDetails } from "@wise-old-man/utils";

interface IMainWrapperProps {
  players: PlayerDetails[];
}

export const MainWrapper = (props: IMainWrapperProps) => {
  const [players, setPlayers] = useState(props.players);
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const drawerFinalFocusRef = useRef<HTMLButtonElement>(null);

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
        setPlayers={setPlayers}
      />
    </VStack>
  );
};
