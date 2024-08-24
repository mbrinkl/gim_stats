export interface ICombined {
  metric: {
    name: string;
    aliases: string[];
    highlight?: {
      value: JSX.Element;
      isAlias: boolean;
    };
  };
  playerData: {
    username: string;
    count: number;
    level?: number;
  }[];
  total: number;
}
