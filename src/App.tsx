import { useQueries } from "@tanstack/react-query";
import { client } from "./womClient";
import { PlayerDetails } from "@wise-old-man/utils";
import { QueryStatusBar } from "./components/QueryStatusBar";
import { PlayerTotals } from "./components/PlayerTotals";

const fetchPlayerDetails = async (playerName: string): Promise<PlayerDetails> => {
  // return new Promise((resolve, reject) => {
  //   import("./assets/sample.json")
  //     .then((data) => {
  //       const playerDetails = {
  //         ...data,
  //         username: playerName,
  //         displayName: playerName,
  //       } as unknown as PlayerDetails;
  //       return resolve(playerDetails);
  //     })
  //     .catch((err) => {
  //       return reject(err);
  //     });
  // });
  return await client.players.getPlayerDetails(playerName);
};

export const gimUsernames: string[] = ["v_trajan_v", "v_aurelius_v", "v_hadrian_v"];

const App = () => {
  const playerQueries = useQueries({
    queries: gimUsernames.map((username) => {
      return {
        queryKey: ["details", username],
        queryFn: () => fetchPlayerDetails(username),
      };
    }),
  });

  if (playerQueries.some((query) => query.error)) {
    return (
      <div>
        <p>Error Fetching Data</p>
      </div>
    );
  }

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return (
    <div>
      {players.map((player) => (
        <div>
          <div>{player.username}</div>
          <div>{player.updatedAt?.toString()}</div>
          <div>{player.latestSnapshot?.data.bosses.duke_sucellus.kills}</div>
        </div>
      ))}
      <PlayerTotals players={players} />
    </div>
  );
};

export default App;
