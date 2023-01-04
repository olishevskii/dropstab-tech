import React from "react";

import classes from "./Home.css";
import {CustomFC} from "../../types/CustomFC";
import GraphToolbar from "./GraphToolbar";
import Graph from "../../components/Graph";
import useRedirect from "../../hooks/useRedirect";
import {useQuery} from "react-query";
import {getHourlyExchange} from "../../api/mainApi";

const Home:CustomFC = () => {
  const isApiKeyExist = !!localStorage.getItem('apiKey');
  useRedirect(!isApiKeyExist, '/settings');

  const tsym = 'BTC';
  const {data, isLoading, isError} = useQuery("exchange", async () => getHourlyExchange({tsym}));

  if (isLoading || isError) {
    return null;
  }

  return (
    <div className={classes.page}>
      <main className={classes.content}>
        <GraphToolbar className={classes.graphToolbar} />
        <Graph exchanges={data.Data} />
      </main>
    </div>
  )
}

export default Home;