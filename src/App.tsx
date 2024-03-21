import { useQueries } from "@tanstack/react-query";
import { client } from "./womClient";
import { PlayerDetails } from "@wise-old-man/utils";

const fetchPlayerDetails = async (
  playerName: string
): Promise<PlayerDetails> => {
  return await client.players.getPlayerDetails(playerName);
};

const App = () => {
  const usernames: string[] = ["v_trajan_v", "v_aurelius_v", "v_hadrian_v"];

  const playerQueries = useQueries({
    queries: usernames.map((username) => {
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
    return <div>Loading...</div>;
  }

  const players = playerQueries.map((query) => ({
    username: query.data?.username,
    updatedAt: query.data?.updatedAt,
    data: query.data?.latestSnapshot?.data,
  }));

  return (
    <div>
      {players.map((player) => (
        <div>{player.username}</div>
      ))}
    </div>
  );
};

export default App;
