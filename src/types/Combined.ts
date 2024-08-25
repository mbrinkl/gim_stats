export interface HighlightedValue {
  value: JSX.Element;
  isAlias: boolean;
}

export interface Metric {
  name: string;
  aliases: string[];
  highlight?: HighlightedValue;
}

export interface PlayerData {
  username: string;
  count: number;
  level?: number;
}

export interface Combined {
  metric: Metric;
  playerData: PlayerData[];
  total: number;
}
