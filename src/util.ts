import { Activity, ActivityValue, Boss, BossValue, MapOf, Skill, SkillValue } from "@wise-old-man/utils";

/**
 * Convert unranked counts from -1 to 0
 */
export const normalizeCount = (kills: number) => {
  if (kills === -1) return 0;
  return kills;
};

/**
 * Remove underscores from boss names
 */
export const formatBossName = (bossName: string) => {
  return bossName.replace(/_/g, " ");
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
  return `https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img/metrics/${metric}.png`;
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

export const combineBossKC = (data: { username: string; maps: MapOf<Boss, BossValue> }[]) => {
  const flat = data.flatMap((x) =>
    Object.values(x.maps).map<ICombined>((y) => ({
      metric: y.metric,
      playerData: [{ username: x.username, count: normalizeCount(y.kills) }],
    })),
  );
  return comby(flat);
};

export const combineActivityScore = (data: { username: string; maps: MapOf<Activity, ActivityValue> }[]) => {
  const flat = data.flatMap((x) =>
    Object.values(x.maps).map<ICombined>((y) => ({
      metric: y.metric,
      playerData: [{ username: x.username, count: normalizeCount(y.score) }],
    })),
  );
  return comby(flat);
};

export const combineSkillXP = (data: { username: string; maps: MapOf<Skill, SkillValue> }[]) => {
  const flat = data.flatMap((x) =>
    Object.values(x.maps).map<ICombined>((y) => ({
      metric: y.metric,
      playerData: [{ username: x.username, count: normalizeCount(y.experience), level: y.level }],
    })),
  );
  return comby(flat);
};

const comby = (flat: ICombined[]) => {
  const summed: ICombined[] = [];
  flat.forEach((category) => {
    const index = summed.map((s) => s.metric).indexOf(category.metric);
    if (index === -1) {
      summed.push(category);
    } else {
      summed[index].playerData.push(category.playerData[0]);
    }
  });
  return summed;
};
