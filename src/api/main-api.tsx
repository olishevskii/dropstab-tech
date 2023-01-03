export enum MainApiURL {
  GETTING_COIN_LIST = 'https://min-api.cryptocompare.com/data/blockchain/list',
  GETTING_HOURLY_EXCHANGE = 'https://min-api.cryptocompare.com/data/exchange/histohour'
}

export const getCoinList = async () => {
  const res = await fetch(MainApiURL.GETTING_COIN_LIST);
  return await res.json();
};

export const getHourlyExchange = async () => {
  const res = await fetch(MainApiURL.GETTING_HOURLY_EXCHANGE);
  return await res.json();
};