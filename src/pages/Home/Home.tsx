import React, {useMemo} from "react";

import classes from "./Home.css";
import {CustomFC} from "../../types/CustomFC";
import GraphToolbar from "./GraphToolbar";
import Graph, {GraphMode} from "../../components/Graph";
import useRedirect from "../../hooks/useRedirect";
import {useQuery} from "react-query";
import {getCoinList, getHourlyExchange} from "../../api/mainApi";
import useTextfield from "../../hooks/useTextfield";

const Home:CustomFC = () => {
  const isApiKeyExist = !!localStorage.getItem('apiKey');
  useRedirect(!isApiKeyExist, '/settings');

  const [selectedCoin, coinHandler] = useTextfield('BTC');
  const coinListQuery = useQuery('coins', getCoinList);
  const coins = useMemo(() => {
    const data = coinListQuery.data?.Data;
    if (coinListQuery.isSuccess && coinListQuery.data?.Data) {
      return Object.values(data);
    }

    return [];
  }, [coinListQuery.data]);

  const getLimit = (graphMode: string) => {
    const result = new Map<string, number>();

    const nowHour = new Date().getHours();
    result.set(GraphMode.DAY, nowHour);
    result.set(GraphMode.THREE_DAYS, 24 * 2 + nowHour);
    result.set(GraphMode.WEEK, 24 * 6 + nowHour);
    result.set(GraphMode.MONTH, 24 * 29 + nowHour);

    return result.get(graphMode);
  }

  const [graphMode, graphModeHandler] = useTextfield(GraphMode.THREE_DAYS);
  const exchangeQuery = useQuery([selectedCoin, graphMode],
    async () => getHourlyExchange({tsym: selectedCoin, limit: getLimit(graphMode)}),
  );



  if (!exchangeQuery?.data?.Data || !coinListQuery?.data?.Data) {
    return null;
  }

  return (
    <div className={classes.page}>
      <main className={classes.content}>
        <GraphToolbar
          className={classes.graphToolbar}
          {...{coins, selectedCoin, coinHandler, graphMode, graphModeHandler}}
        />
        <Graph exchanges={exchangeQuery.data?.Data} mode={graphMode} />
      </main>
    </div>
  )
}

export default Home;