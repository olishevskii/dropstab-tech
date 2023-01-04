import React from "react";
import clsx from "clsx";

// TODO: add absolute path for types
import {CustomFC} from "../../types/CustomFC";
import classes from "./GraphToolbar.css";
import Button from "../../components/Button";
import Select from "../../components/Select";
import {useQuery} from "react-query";
import {getCoinList} from "../../api/mainApi";
import {GettingCoinListDto} from "../../api/dto/GettingCoinListDto";

const GraphToolbar: CustomFC = ({className}) => {
  const {data, isLoading, isError} = useQuery('coins', getCoinList);

  if (isLoading || isError) {
    return null;
  }

  const mapToOptions = (dto: GettingCoinListDto) => {
    return Object.values(dto.Data)
      .map(coin => ({value: coin.symbol, description: coin.symbol}));
  }

  return (
    <form className={clsx(className, classes.graphToolbar)}>
      <div className={classes.container}>
        <Button className={classes.button}>Day</Button>
        <Button className={classes.button}>3 Days</Button>
        <Button className={classes.button}>Week</Button>
        <Button className={classes.button}>Month</Button>
      </div>
      <div className={classes.container}>
        <Button className={classes.button}>Refresh</Button>
        <Select options={mapToOptions(data)} />
      </div>
    </form>
  );
}

export default GraphToolbar;