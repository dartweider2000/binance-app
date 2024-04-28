export interface IOption {
  title: string;
  value: string | number;
}

export interface ILog {
  from: string;
  to: string;
  date: number;
}

export type SelectOption = string | IOption;

export interface IDepth {
  lastUpdateId: number;
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
}
