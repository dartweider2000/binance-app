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

export interface IComponentHtmlRef {
  $el: HTMLElement;
}

export interface ITableHeader {
  title: string;
  key: string;
  align?: "end" | "start" | "center";
}

export type Order = [string, string];

export interface IDepthRestResponse {
  lastUpdateId: number;
  bids: Order[];
  asks: Order[];
}

export interface IDepthWebSocketResponse {
  U: number;
  u: number;
  b: Order[];
  a: Order[];
}

export interface IDepthTableRow {
  price: number;
  quantity: number;
  total: number;
}
