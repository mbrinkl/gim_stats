import { MapOf } from "@wise-old-man/utils";

/**
 * Convert unranked counts from -1 to 0
 */
export const normalizeKillCount = (kills: number) => {
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
 * Get PNG for metric from WOM GitHub repo
 */
export const getWomImgUrl = (metric: string) => {
  return `https://raw.githubusercontent.com/wise-old-man/wise-old-man/master/app/public/img/metrics/${metric}.png`;
};

// TODO: clean this up lol
interface IMetric {
  metric: string;
}

export const combineCounts = <T1 extends string | number | symbol, T2 extends IMetric>(
  arr: MapOf<T1, T2>[],
  sumPropName: keyof T2,
) => {
  const flat = arr.flatMap((x) =>
    // eslint-disable-next-line
    Object.values(x).map((y: any) => ({ metric: y.metric, [sumPropName]: normalizeKillCount(y[sumPropName]) })),
  );

  // eslint-disable-next-line
  const summed: any[] = [];
  flat.forEach((category) => {
    const index = summed.map((s) => s.metric).indexOf(category.metric);
    if (index === -1) {
      summed.push(category);
    } else {
      // @ts-expect-error temp
      summed[index][sumPropName] += category[sumPropName];
    }
  });

  return summed;
};
