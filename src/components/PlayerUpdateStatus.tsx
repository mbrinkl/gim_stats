import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { PlayerDetails } from "@wise-old-man/utils";
import moment from "moment";
import { useUpdatePlayerMutation } from "../api/updatePlayer";

interface IPlayerUpdateStatsuProps {
  player: PlayerDetails;
  setPlayers: React.Dispatch<React.SetStateAction<PlayerDetails[]>>;
}

export const PlayerUpdateStatus = (props: IPlayerUpdateStatsuProps) => {
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
      id: "update_toast_success_" + props.player.username,
      title: "Updated Successfully",
      duration: 3000,
      status: "success",
    });
  };

  const onUpdateError = (error: Error) => {
    toast({
      id: "update_toast_error_" + props.player.username,
      title: "Error Updating",
      description: error.message,
      duration: 3000,
      status: "error",
    });
  };

  const { mutate, isPending } = useUpdatePlayerMutation(onUpdateSucces, onUpdateError);

  return (
    <Box key={props.player.username}>
      <Text>{props.player.username}</Text>
      <Text>Last Update: {moment(props.player.updatedAt!).fromNow()}</Text>
      <Button onClick={() => mutate(props.player.username)} isLoading={isPending}>
        Update
      </Button>
    </Box>
  );
};
