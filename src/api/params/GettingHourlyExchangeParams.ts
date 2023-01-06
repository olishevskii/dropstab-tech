export interface GettingHourlyExchangeParams {
  tsym: string;
  e?: string;
  aggregate?: string;
  aggregatePredictableTimePeriods?: boolean;
  limit?: number;
  toTs?: string;
  extraParams?: string;
  sign?: boolean;
}
