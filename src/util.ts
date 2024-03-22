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
  const MIL = 1_000_000;
  if (count > MIL) {
    const formatted = (Math.floor((count / MIL) * 10) / 10).toFixed(1);
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
  count: number;
}

export const combineBossKC = (maps: MapOf<Boss, BossValue>[]) => {
  const flat = maps.flatMap((x) =>
    Object.values(x).map<ICombined>((y) => ({ metric: y.metric, count: normalizeCount(y.kills) })),
  );

  return comby(flat);
};

export const combineActivityScore = (maps: MapOf<Activity, ActivityValue>[]) => {
  const flat = maps.flatMap((x) =>
    Object.values(x).map<ICombined>((y) => ({ metric: y.metric, count: normalizeCount(y.score) })),
  );

  return comby(flat);
};

export const combineSkillXP = (maps: MapOf<Skill, SkillValue>[]) => {
  const flat = maps.flatMap((x) =>
    Object.values(x).map<ICombined>((y) => ({ metric: y.metric, count: normalizeCount(y.experience) })),
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
      summed[index].count += category.count;
    }
  });
  return summed;
};
