import { UseQueryOptions, useQueries } from "@tanstack/react-query";
import { API_IPlayerDetails, IPlayerDetails } from "../types";
import { normalizeCount } from "../util";

const notFoundMessage: string = "Username not found.";

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
  if (res.status === 404) {
    throw new Error(notFoundMessage);
  } else if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = (await res.json()) as API_IPlayerDetails;
  return transformResponse(data, username);
};

export const useFetchPlayerQueries = (usernames: string[]) =>
  useQueries({
    queries: usernames.map((username): UseQueryOptions<IPlayerDetails> => {
      return {
        queryKey: ["details", username],
        queryFn: () => fetchPlayer(username),
        retry: (retryCount, error) => {
          return retryCount < 3 && error.message !== notFoundMessage;
        },
      };
    }),
  });
