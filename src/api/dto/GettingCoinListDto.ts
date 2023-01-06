export interface CoinDto {
  id: number;
  symbol: string;
  partner_symbol: string;
  data_available_from: number;
}

export interface GettingCoinListDto {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: {};
  Data: { [key: string]: CoinDto };
}
