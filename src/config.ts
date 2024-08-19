export const DEFAULT_USERNAMES: string[] = ["v_trajan_v", "v_aurelius_v", "v_hadrian_v", "v_nerva_v"];

/**
 * Aliases used when searching a metric
 * Abbreviations do not need to be listed - they are handled by fuzzy search
 *    ie.) Chambers of Xeric: CoX
 * */
export const ALIASES: Record<string, string[]> = {
  "General Graardor": ["Bandos"],
};

export const MIN_NUM_USERNAMES: number = 2;
export const MAX_NUM_USERNAMES: number = 10;

export const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9_.-]*$/;
