import { QueryStatusBar } from "./components/QueryStatusBar";
import { HomePage } from "./components/HomePage";
import { useFetchPlayerQueries } from "./api/fetchPlayer";

export const App = () => {
  const playerQueries = useFetchPlayerQueries();

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return <HomePage players={players} />;
};
