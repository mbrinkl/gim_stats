export interface ICombined {
  metric: {
    name: string;
    aliases: string[];
  };
  playerData: {
    username: string;
    count: number;
    level?: number;
  }[];
}
