import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import moment from "moment";
import { RefObject } from "react";
import { useUpdatePlayerMutation } from "../api/updatePlayer";

interface IPlayerUpdateDrawerProps {
  players: PlayerDetails[];
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef: RefObject<HTMLButtonElement>;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDetails[]>>;
}

export const PlayerUpdateDrawer = (props: IPlayerUpdateDrawerProps) => {
  const toast = useToast();

  const onUpdateSucces = (updatedPlayer: PlayerDetails) => {
    props.setPlayers((prev) =>
      prev.map((player) => {
        if (player.username === updatedPlayer.username) {
          return updatedPlayer;
        }
        return player;
      }),
    );
    toast({
      id: "update_toast_success",
      title: "Updated Successfully",
      duration: 3000,
      status: "success",
    });
  };

  const onUpdateError = (error: Error) => {
    toast({
      id: "update_toast_error",
      title: "Error Updating",
      description: error.message,
      duration: 3000,
      status: "error",
    });
  };

  const { mutate, isPending } = useUpdatePlayerMutation(onUpdateSucces, onUpdateError);

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
              <Button onClick={() => mutate(player.username)} isDisabled={isPending}>
                Update
              </Button>
            </Box>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
