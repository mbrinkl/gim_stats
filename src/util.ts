import { HIDDEN_ACTIVITIES } from "./config";
import { ICombined } from "./types/ICombined";
import { IActivity, IPlayerDetails, ISkill } from "./types";

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
  if (count > 100_000) {
    const formatted = (Math.floor((count / 1_000_000) * 10) / 10).toFixed(1);
    return formatted + "M";
  }
  return count.toString();
};

/**
 * Get PNG for metric from WOM GitHub repo
 */
export const getWomImgUrl = (metric: string): string => {
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
  return `https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img/metrics/${formatted}.png`;
};

export const combineActivityScore = (players: IPlayerDetails[]) => {
  const combined: ICombined[] = [];
  players.forEach((player) => {
    player.activities.forEach((activity) => {
      if (HIDDEN_ACTIVITIES.includes(activity.name)) {
        return;
      }
      const index = combined.map((s) => s.metric).indexOf(activity.name);
      if (index === -1) {
        combined.push({ metric: activity.name, playerData: [getCombinedActivityData(player, activity)] });
      } else {
        combined[index].playerData.push(getCombinedActivityData(player, activity));
      }
    });
  });
  return combined;
};

const getCombinedActivityData = (player: IPlayerDetails, activity: IActivity) => {
  return { username: player.username, count: activity.score };
};

export const combineSkillXP = (players: IPlayerDetails[]) => {
  const combined: ICombined[] = [];
  players.forEach((player) => {
    player.skills.forEach((skill) => {
      const index = combined.map((s) => s.metric).indexOf(skill.name);
      if (index === -1) {
        combined.push({
          metric: skill.name,
          playerData: [getCombinedSkillData(player, skill)],
        });
      } else {
        combined[index].playerData.push(getCombinedSkillData(player, skill));
      }
    });
  });
  return combined;
};

const getCombinedSkillData = (player: IPlayerDetails, skill: ISkill) => {
  return { username: player.username, count: skill.xp, level: skill.level };
};
