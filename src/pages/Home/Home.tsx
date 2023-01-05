import React, {useCallback, useMemo} from "react";
import {useQuery} from "react-query";

import classes from "./Home.css";
import {CustomFC} from "types/CustomFC";
import GraphToolbar from "./GraphToolbar";
import {Progress, Graph} from "components";
import {GraphMode} from "components/Graph";
import {useRedirect, useTextfield} from "hooks";
import {getCoinList, getHourlyExchange} from "api/mainApi";

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

  const getLimit = useCallback((graphMode: string) => {
    const result = new Map<string, number>();

    const nowHour = new Date().getHours();
    result.set(GraphMode.DAY, nowHour);
    result.set(GraphMode.THREE_DAYS, 24 * 2 + nowHour);
    result.set(GraphMode.WEEK, 24 * 6 + nowHour);
    result.set(GraphMode.MONTH, 24 * 29 + nowHour);

    return result.get(graphMode);
  }, []);

  const [graphMode, graphModeHandler] = useTextfield(GraphMode.THREE_DAYS);
  const exchangeQuery = useQuery([selectedCoin, graphMode],
    async () => getHourlyExchange({tsym: selectedCoin, limit: getLimit(graphMode)}),
  );

  const getGraph = useCallback(() => {
    const graphData = exchangeQuery.data?.Data;
    const isLoading = exchangeQuery.isLoading || exchangeQuery.isFetching;
    if (isLoading) {
      return <Progress className={classes.progress} />;
    }

    const isGraphDataExist = graphData.length >= 1;
    if (isGraphDataExist) {
      return <Graph exchanges={graphData} mode={graphMode}/>;
    }

    return <p className={classes.resultMessage}>Data not found</p>
  }, [exchangeQuery, graphMode]);

  const isCoinListExist = coinListQuery?.data?.Data;
  if (!isCoinListExist) {
    return <div className={classes.page}>
      <Progress color="secondary" />
    </div>
  }

  return (
    <div className={classes.page}>
      <main className={classes.content}>
        {isCoinListExist && <GraphToolbar
          className={classes.graphToolbar}
          {...{coins, selectedCoin, coinHandler, graphMode, graphModeHandler}}
        />}
        {getGraph()}
      </main>
    </div>
  )
}

export default Home;