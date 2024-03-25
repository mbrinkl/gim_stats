import { PlayerDetails } from "@wise-old-man/utils";
import { client } from "./womClient";
import { useMutation } from "@tanstack/react-query";

const mockUpdatePlayer = (playerName: string): Promise<PlayerDetails> => {
  return new Promise((resolve, reject) => {
    import("../assets/sample.json")
      .then((data) => {
        const playerDetails = {
          ...data,
          username: playerName,
          displayName: playerName,
          updatedAt: new Date(),
        } as unknown as PlayerDetails;
        return resolve(playerDetails);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const updatePlayer = async (playerName: string): Promise<PlayerDetails> => {
  if (import.meta.env.MODE === "mocked") return mockUpdatePlayer(playerName);
  return await client.players.updatePlayer(playerName);
};

export const useUpdatePlayerMutation = (
  onSuccess: (updatedPlayer: PlayerDetails) => void,
  onError: (error: Error) => void,
) =>
  useMutation({
    mutationFn: (x: string) => updatePlayer(x),
    onSuccess,
    onError,
  });
