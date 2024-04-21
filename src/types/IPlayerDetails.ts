export interface IPlayerDetails extends API_IPlayerDetails {
  username: string;
}

export interface API_IPlayerDetails {
  skills: ISkill[];
  activities: IActivity[];
}

export interface ISkill {
  id: number;
  name: string;
  rank: number;
  level: number;
  xp: number;
}

export interface IActivity {
  id: number;
  name: string;
  rank: number;
  score: number;
}
