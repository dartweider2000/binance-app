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
