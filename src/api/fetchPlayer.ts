import { useQueries } from "@tanstack/react-query";
import { GROUP_USERNAMES } from "../config";
import { API_IPlayerDetails, IPlayerDetails } from "../types";
import { normalizeCount } from "../util";

const transformResponse = (playerDetails: API_IPlayerDetails, username: string): IPlayerDetails => {
  return {
    ...playerDetails,
    username,
    activities: playerDetails.activities.map((x) => ({
      ...x,
      score: normalizeCount(x.score),
    })),
  };
};

const fetchPlayer = async (username: string): Promise<IPlayerDetails> => {
  const url = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + username;
  const proxiedUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
  const res = await fetch(proxiedUrl);
  const data = (await res.json()) as API_IPlayerDetails;
  return transformResponse(data, username);
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
