import { EnsureQueryDataOptions } from "@tanstack/react-query";
import { API_PlayerDetails, PlayerDetails } from "../types";
import { getProxiedUrl, normalizeCount } from "../util";

const transformResponse = (playerDetails: API_PlayerDetails, username: string): PlayerDetails => {
  return {
    ...playerDetails,
    username,
    activities: playerDetails.activities.map((activity) => ({
      ...activity,
      score: normalizeCount(activity.score),
    })),
    skills: playerDetails.skills.map((skill) => ({
      ...skill,
      xp: normalizeCount(skill.xp),
    })),
  };
};

const fetchPlayer = async (username: string): Promise<PlayerDetails> => {
  const url = "https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + username;
  const proxiedUrl = getProxiedUrl(url);
  const res = await fetch(proxiedUrl);
  if (res.status === 404) {
    throw new Error("Username not found: " + username);
  } else if (!res.ok) {
    throw new Error("Failed to fetch user data for " + username);
  }
  const data = (await res.json()) as API_PlayerDetails;
  return transformResponse(data, username);
};

export const fetchPlayerQueryOpts = (username: string): EnsureQueryDataOptions<PlayerDetails> => ({
  queryKey: ["details", username],
  queryFn: () => fetchPlayer(username),
});
