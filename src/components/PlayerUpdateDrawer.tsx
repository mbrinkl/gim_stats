import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import moment from "moment";
import { RefObject } from "react";

interface IPlayerUpdateDrawerProps {
  players: PlayerDetails[];
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef: RefObject<HTMLButtonElement>;
}

export const PlayerUpdateDrawer = (props: IPlayerUpdateDrawerProps) => {
  return (
    <Drawer isOpen={props.isOpen} placement="bottom" onClose={props.onClose} finalFocusRef={props.finalFocusRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {props.players.map((player) => (
            <Box key={player.username}>
              <Text>{player.username}</Text>
              <Text>Last Update: {moment(player.updatedAt!).fromNow()}</Text>
              <Button isDisabled>Update</Button>
            </Box>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
