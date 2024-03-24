import { PlayerDetails } from "@wise-old-man/utils";

export const mockFetchPlayerDetails = async (playerName: string): Promise<PlayerDetails> => {
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
