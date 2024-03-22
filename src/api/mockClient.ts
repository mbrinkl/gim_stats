import { PlayerDetails } from "@wise-old-man/utils";

export const mockFetchPlayerDetails = async (playerName: string): Promise<PlayerDetails> => {
  return new Promise((resolve, reject) => {
    import("../assets/sample.json")
      .then((data) => {
        const playerDetails = {
          ...data,
          username: playerName,
          displayName: playerName,
        } as unknown as PlayerDetails;
        return resolve(playerDetails);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};
