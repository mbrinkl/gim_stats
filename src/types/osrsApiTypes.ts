export interface IPlayerDetails {
  skills: ISkill[];
  activities: IActivity[];

  // custom properties
  username: string;
}

export interface IActivity {
  id: number;
  name: string;
  rank: number;
  score: number;
}

export interface ISkill {
  id: number;
  name: string;
  rank: number;
  level: number;
  xp: number;
}
