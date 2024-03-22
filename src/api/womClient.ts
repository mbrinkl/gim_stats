import { PlayerDetails, WOMClient } from "@wise-old-man/utils";
import { mockFetchPlayerDetails } from "./mockClient";

const client = new WOMClient({
  apiKey: import.meta.env.VITE_WOM_API_KEY,
  userAgent: import.meta.env.VITE_DISCORD_USERNAME,
});

export const fetchPlayerDetails = async (playerName: string): Promise<PlayerDetails> => {
  if (import.meta.env.MODE === "mocked") return mockFetchPlayerDetails(playerName);
  return await client.players.getPlayerDetails(playerName);
};

export const updatePlayer = async (playerName: string): Promise<PlayerDetails> => {
  return await client.players.updatePlayer(playerName);
};
