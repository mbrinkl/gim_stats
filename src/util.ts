import { IActivity, IPlayerDetails, ISkill } from "./types/osrsApiTypes";

/**
 * Convert unranked counts from -1 to 0
 */
export const normalizeCount = (kills: number) => {
  if (kills === -1) return 0;
  return kills;
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
export const getWomImgUrl = (metric: string) => {
  // regex this plox
  let formatted = metric
    .toLocaleLowerCase()
    .replace(" - rank", "")
    .replace(/ /g, "_")
    .replace("(", "")
    .replace(")", "")
    .replace("'", "")
    .replace("-", "_")
    .replace(":", "");
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

// TODO: clean this up lol
export interface ICombined {
  metric: string;
  playerData: {
    username: string;
    count: number;
    level?: number;
  }[];
}

// export const combineBossKC = (data: { username: string; maps: MapOf<Boss, BossValue> }[]) => {
//   const flat = data.flatMap((x) =>
//     Object.values(x.maps).map<ICombined>((y) => ({
//       metric: y.metric,
//       playerData: [{ username: x.username, count: normalizeCount(y.kills) }],
//     })),
//   );
//   return comby(flat);
// };

const hiddenActivies = [
  "League Points",
  "Deadman Points",
  "Bounty Hunter - Hunter",
  "Bounty Hunter - Rogue",
  "Bounty Hunter (Legacy) - Hunter",
  "Bounty Hunter (Legacy) - Rogue",
];

export const combineActivityScore = (players: IPlayerDetails[]) => {
  const combined: ICombined[] = [];
  players.forEach((player) => {
    player.activities.forEach((activity) => {
      if (hiddenActivies.includes(activity.name)) {
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
  return { username: player.username, count: normalizeCount(activity.score) };
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
  return { username: player.username, count: normalizeCount(skill.xp), level: normalizeCount(skill.level) };
};
