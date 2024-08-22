export const DEFAULT_USERNAMES: string[] = ["v_trajan_v", "v_aurelius_v", "v_hadrian_v", "v_nerva_v", "v_pius_v"];

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
  "Commander Zilyana": ["Saradomin"],
  "K'ril Tsutsaroth": ["Zamorak"],
  "Kree'Arra": ["Armadyl"],
  "Sol Heredit": ["Colosseum"],
  "TzKal-Zuk": ["Inferno"],
  "Lunar Chests": ["Moons of Peril"],
  "Grotesque Guardis": ["Dusk", "Dawn"],
};

export const MIN_NUM_USERNAMES: number = 2;
export const MAX_NUM_USERNAMES: number = 10;

export const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9](([a-zA-Z0-9_ -]{0,10})[a-zA-Z0-9])?$/;
