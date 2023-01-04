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

  const exchangeQuery = useQuery(selectedCoin,
    async () => getHourlyExchange({tsym: selectedCoin}),
  );

  const [graphMode, graphModeHandler] = useTextfield(GraphMode.DAY);

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
        <Graph exchanges={exchangeQuery.data?.Data} />
      </main>
    </div>
  )
}

export default Home;