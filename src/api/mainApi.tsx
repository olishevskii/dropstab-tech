import {GettingCoinListDto} from "./dto/GettingCoinListDto";

export enum MainApiURL {
  GETTING_COIN_LIST = 'https://min-api.cryptocompare.com/data/blockchain/list',
  GETTING_HOURLY_EXCHANGE = 'https://min-api.cryptocompare.com/data/exchange/histohour'
}

const getUrlWithApiKey = (url: string) => {
  const apiKey = localStorage.getItem('apiKey');
  return `${url}?api_key=${apiKey}`;
}

export const getCoinList = async (): Promise<GettingCoinListDto> => {
  const res = await fetch(getUrlWithApiKey(MainApiURL.GETTING_COIN_LIST));
  return await res.json();
};

export const getHourlyExchange = async () => {
  const res = await fetch(getUrlWithApiKey(MainApiURL.GETTING_HOURLY_EXCHANGE));
  return await res.json();
};