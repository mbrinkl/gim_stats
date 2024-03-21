/**
 * Convert unranked kill counts from -1 to 0
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
