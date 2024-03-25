import { useQueries } from "@tanstack/react-query";
import { PlayerDetails } from "@wise-old-man/utils";
import { GROUP_USERNAMES } from "../config";
import { client } from "./womClient";

const mockFetchPlayer = async (playerName: string): Promise<PlayerDetails> => {
  return new Promise((resolve, reject) => {
    import("../assets/sample.json")
      .then((data) => {
        const playerDetails = {
          ...data,
          username: playerName,
          displayName: playerName,
          updatedAt: new Date(data.updatedAt),
        } as unknown as PlayerDetails;
        return resolve(playerDetails);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const fetchPlayer = async (playerName: string): Promise<PlayerDetails> => {
  if (import.meta.env.MODE === "mocked") return mockFetchPlayer(playerName);
  return await client.players.getPlayerDetails(playerName);
};

export const useFetchPlayerQueries = () =>
  useQueries({
    queries: GROUP_USERNAMES.map((username) => {
      return {
        queryKey: ["details", username],
        queryFn: () => fetchPlayer(username),
      };
    }),
  });
