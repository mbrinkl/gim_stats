import { Flex, Link, VStack } from "@chakra-ui/react";
import { PlayerTotals } from "./PlayerTotals";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { IPlayerDetails } from "../types/osrsApiTypes";

interface IMainWrapperProps {
  players: IPlayerDetails[];
}

export const MainWrapper = (props: IMainWrapperProps) => {
  return (
    <VStack gap={3} padding={3}>
      <Flex w="100%" justify="space-between" align="center">
        <Link href="https://wiseoldman.net/groups/7075" isExternal>
          WOM Group <ExternalLinkIcon mx="2px" />
        </Link>
      </Flex>
      <PlayerTotals players={props.players} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
