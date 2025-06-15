import { ALIASES, HIDDEN_ACTIVITIES, WOM_BG_OVERRIDE_MAP, WOM_METRIC_MAP } from "./config";
import { Activity, ImageData, PlayerDetails, Skill, Combined, PlayerData, SortMethod } from "./types";

/**
 * Convert unranked counts from -1 to 0
 */
export const normalizeCount = (count: number): number => (count === -1 ? 0 : count);

/**
 * Format a count value into formatted string
 */
export const formatCount = (count: number): string => {
  if (count >= 100_000) {
    const formatted = (Math.floor((count / 1_000_000) * 10) / 10).toFixed(1);
    return formatted + "M";
  }
  return count.toString();
};

/**
 * Get PNG URLs for a metric from the WOM GitHub repo.
 */
export const getWomImages = (metric: string): ImageData => {
  const normalized = metric
    .toLowerCase()
    .replace(" - rank", "")
    .replace(/[\s-]/g, "_")
    .replace(/[()':]/g, "");

  const formatted = WOM_METRIC_MAP[normalized] ?? normalized;
  const formattedBg = WOM_BG_OVERRIDE_MAP[formatted] ?? formatted;

  const baseUrl = "https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img";

  return {
    backgroundImg: `${baseUrl}/backgrounds/${formattedBg}.png`,
    metricImg: `${baseUrl}/metrics/${formatted}.png`,
  };
};

export const sort = (arr: Combined[], method: SortMethod): Combined[] => {
  const deepClonedArr = JSON.parse(JSON.stringify(arr)) as Combined[];
  switch (method) {
    case "default":
    default:
      return deepClonedArr;
    case "alphabetical":
      return deepClonedArr.sort((a, b) => a.metric.name.localeCompare(b.metric.name));
    case "by_count":
      return deepClonedArr.sort((a, b) => b.total - a.total);
  }
};

export const combine = (
  players: PlayerDetails[],
  key: keyof Pick<PlayerDetails, "activities" | "skills">,
): Combined[] => {
  const combined: Combined[] = [];
  players.forEach((player) => {
    player[key].forEach((item) => {
      if (HIDDEN_ACTIVITIES.includes(item.name)) {
        return;
      }
      const index = combined.map((s) => s.metric.name).indexOf(item.name);
      if (index === -1) {
        combined.push({
          metric: { name: item.name, aliases: ALIASES[item.name] ?? [] },
          playerData: [getActivityOrSkillPlayerData(player, item)],
          total: "score" in item ? item["score"] : item["xp"],
        });
      } else {
        combined[index].playerData.push(getActivityOrSkillPlayerData(player, item));
        combined[index].total += "score" in item ? item["score"] : item["xp"];
      }
    });
  });
  return combined;
};

const getActivityOrSkillPlayerData = (player: PlayerDetails, item: Activity | Skill): PlayerData => {
  if ("score" in item) {
    return { username: player.username, count: item.score };
  } else {
    return { username: player.username, count: item.xp, level: item.level };
  }
};
