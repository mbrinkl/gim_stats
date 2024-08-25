import { ALIASES, HIDDEN_ACTIVITIES } from "./config";
import { Activity, ImageData, PlayerDetails, Skill, Combined, PlayerData } from "./types";
import { SortMethod } from "./enums";

/**
 * Convert unranked counts from -1 to 0
 */
export const normalizeCount = (count: number): number => {
  if (count === -1) return 0;
  return count;
};

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
 * Get PNG for metric from WOM GitHub repo
 */
export const getWomImages = (metric: string): ImageData => {
  let formatted = metric
    .toLocaleLowerCase()
    .replace(" - rank", "")
    .replace(/ |-/g, "_")
    .replace(/[()':]/g, "");
  if (formatted === "runecraft") {
    formatted = "runecrafting";
  } else if (formatted === "tombs_of_amascut_expert_mode") {
    formatted = "tombs_of_amascut_expert";
  } else if (formatted === "rifts_closed") {
    formatted = "guardians_of_the_rift";
  } else if (formatted === "lms") {
    formatted = "last_man_standing";
  }
  return {
    backgroundImg: `https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img/backgrounds/${formatted}.png`,
    metricImg: `https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img/metrics/${formatted}.png`,
  };
};

export const sort = (arr: Combined[], method: SortMethod): Combined[] => {
  const deepClonedArr = JSON.parse(JSON.stringify(arr)) as Combined[];
  switch (method) {
    case SortMethod.DEFAULT:
    default:
      return deepClonedArr;
    case SortMethod.ALPHABETICAL:
      return deepClonedArr.sort((a, b) => a.metric.name.localeCompare(b.metric.name));
    case SortMethod.BY_COUNT:
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
