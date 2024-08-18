export const GROUP_USERNAMES: string[] = ["v_trajan_v", "v_aurelius_v", "v_hadrian_v", "v_nerva_v"];

export const HIDDEN_ACTIVITIES: string[] = [
  "League Points",
  "Deadman Points",
  "Bounty Hunter - Hunter",
  "Bounty Hunter - Rogue",
  "Bounty Hunter (Legacy) - Hunter",
  "Bounty Hunter (Legacy) - Rogue",
];

/**
 * Aliases used when searching a metric
 * Abbreviations do not need to be listed - they are handled by fuzzy search
 *    ie.) Chambers of Xeric: CoX
 * */
export const ALIASES: Record<string, string[]> = {
  "General Graardor": ["Bandos"],
};
