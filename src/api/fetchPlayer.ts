import { EnsureQueryDataOptions, UseQueryOptions, useQueries } from "@tanstack/react-query";
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

export const fetchPlayer = async (username: string): Promise<IPlayerDetails> => {
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

export const fetchPlayerQueryOpts = (username: string): EnsureQueryDataOptions<IPlayerDetails> => ({
  queryKey: ["details", username],
  queryFn: () => fetchPlayer(username),
});
