import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import { RefObject } from "react";
import { PlayerUpdateStatus } from "./PlayerUpdateStatus";

interface IPlayerUpdateDrawerProps {
  players: PlayerDetails[];
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef: RefObject<HTMLButtonElement>;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDetails[]>>;
}

export const PlayerUpdateDrawer = (props: IPlayerUpdateDrawerProps) => {
  return (
    <Drawer isOpen={props.isOpen} placement="bottom" onClose={props.onClose} finalFocusRef={props.finalFocusRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {props.players.map((player) => (
            <PlayerUpdateStatus player={player} setPlayers={props.setPlayers} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
