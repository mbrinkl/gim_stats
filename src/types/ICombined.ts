export interface ICombined {
  metric: string;
  playerData: {
    username: string;
    count: number;
    level?: number;
  }[];
}
