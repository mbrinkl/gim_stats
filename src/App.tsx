import { QueryStatusBar } from "./components/QueryStatusBar";
import { HomePage } from "./components/HomePage";
import { useFetchPlayerQueries } from "./api/fetchPlayer";
import { useState } from "react";
import { UsernameInputs } from "./components/UsernameInputs";
import { DEFAULT_USERNAMES } from "./config";

export const App = () => {
  const [usernames, setUsernames] = useState<string[]>(DEFAULT_USERNAMES);
  const [isEditingUsernames, setIsEditingUsernames] = useState(false);

  const playerQueries = useFetchPlayerQueries(usernames);

  if (isEditingUsernames) {
    return (
      <UsernameInputs
        usernames={usernames}
        onSubmit={(unz) => {
          setUsernames(unz);
          setIsEditingUsernames(false);
        }}
      />
    );
  }

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} usernames={usernames} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return <HomePage players={players} setIsEdit={() => setIsEditingUsernames(true)} />;
};
