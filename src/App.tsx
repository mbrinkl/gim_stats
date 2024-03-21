import { useQueries } from "@tanstack/react-query";
import { client } from "./womClient";
import { PlayerDetails } from "@wise-old-man/utils";
import { QueryStatusBar } from "./components/QueryStatusBar";
import { PlayerTotals } from "./components/PlayerTotals";
import { Box, Link, VStack } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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

export const App = () => {
  const playerQueries = useQueries({
    queries: gimUsernames.map((username) => {
      return {
        queryKey: ["details", username],
        queryFn: () => fetchPlayerDetails(username),
      };
    }),
  });

  if (!playerQueries.every((query) => query.data)) {
    return <QueryStatusBar queries={playerQueries} />;
  }

  const players = playerQueries.map((query) => query.data!);

  return (
    <VStack gap={3} padding={3}>
      {players.map((player) => (
        <Box key={player.username}>
          <div>{player.username}</div>
          <div>Last Update: {player.updatedAt?.toString()}</div>
        </Box>
      ))}
      <PlayerTotals players={players} />
      <Link href="https://github.com/mbrinkl/gim_stats" isExternal>
        Source <ExternalLinkIcon mx="2px" />
      </Link>
    </VStack>
  );
};
