import { useQueries } from "@tanstack/react-query";
import { GROUP_USERNAMES } from "../config";
import { IPlayerDetails } from "../types/osrsApiTypes";

const fetchPlayer = async (playerName: string): Promise<IPlayerDetails> => {
  const url = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + playerName;
  const proxiedUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
  const res = await fetch(proxiedUrl);
  const data = (await res.json()) as IPlayerDetails;

  // add custom properties
  data.username = playerName;

  return data;
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
