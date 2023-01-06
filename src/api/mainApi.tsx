import { GettingCoinListDto } from "./dto/GettingCoinListDto";
import { GettingHourlyExchangeDto } from "./dto/GettingHourlyExchangeDto";
import { GettingHourlyExchangeParams } from "./params/GettingHourlyExchangeParams";

export enum MainApiURL {
  GETTING_COIN_LIST = "https://min-api.cryptocompare.com/data/blockchain/list",
  GETTING_HOURLY_EXCHANGE = "https://min-api.cryptocompare.com/data/exchange/histohour",
}

const getHeader = () => {
  const headers = new Headers();
  const apiKey = localStorage.getItem("apiKey");
  headers.set("authorization", `Apikey ${apiKey}`);

  return headers;
};

const getUrlWithParams = (url: string, params: { [key: string]: any }) => {
  const preparedParams = new URLSearchParams(params).toString();
  return `${url}?${preparedParams}`;
};

export const getCoinList = async (): Promise<GettingCoinListDto> => {
  const res = await fetch(MainApiURL.GETTING_COIN_LIST, {
    headers: getHeader(),
  });
  return res.json();
};

export const getHourlyExchange = async (
  params: GettingHourlyExchangeParams
): Promise<GettingHourlyExchangeDto> => {
  const res = await fetch(
    getUrlWithParams(MainApiURL.GETTING_HOURLY_EXCHANGE, params),
    {
      headers: getHeader(),
    }
  );
  return res.json();
};
