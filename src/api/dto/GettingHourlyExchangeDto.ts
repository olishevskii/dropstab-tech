export interface Exchange {
  time: number;
  volume: number;
}

export interface GettingHourlyExchangeDto {
  Type: number;
  Message: string;
  Data: Exchange[];
  TimeFrom: number;
  TimeTo: number;
  FirstValueInArray: boolean;
  ConversionType: string;
  RateLimit: {};
  HasWarning: boolean;
}
