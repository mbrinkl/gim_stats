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
