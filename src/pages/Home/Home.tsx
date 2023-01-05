import React, {useMemo} from "react";
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

  const isCoinListExist = coinListQuery?.data?.Data;
  if (!isCoinListExist) {
    return <div className={classes.page}>
      <Progress color="secondary" />
    </div>
  }

  const isGraphDataExist = exchangeQuery?.data?.Data;
  return (
    <div className={classes.page}>
      <main className={classes.content}>
        {isCoinListExist && <GraphToolbar
          className={classes.graphToolbar}
          {...{coins, selectedCoin, coinHandler, graphMode, graphModeHandler}}
        />}
        {isGraphDataExist && <Graph exchanges={exchangeQuery.data?.Data} mode={graphMode}/>}
        {!isGraphDataExist && <Progress className={classes.progress} />}
      </main>
    </div>
  )
}

export default Home;