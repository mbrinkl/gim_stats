export interface PlayerDetails extends API_PlayerDetails {
  username: string;
}

export interface API_PlayerDetails {
  skills: Skill[];
  activities: Activity[];
}

export interface Skill {
  id: number;
  name: string;
  rank: number;
  level: number;
  xp: number;
}

export interface Activity {
  id: number;
  name: string;
  rank: number;
  score: number;
}
