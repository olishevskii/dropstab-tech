import React, {ChangeEventHandler, useMemo} from "react";
import clsx from "clsx";

// TODO: add absolute path for types
import {CustomFC} from "../../types/CustomFC";
import classes from "./GraphToolbar.css";
import Button from "../../components/Button";
import Select from "../../components/Select";
import {CoinDto} from "../../api/dto/GettingCoinListDto";

interface GraphToolbarProps {
  coins: CoinDto[];
  selectedCoin: string;
  coinHandler: ChangeEventHandler<HTMLSelectElement>;
}

const GraphToolbar: CustomFC<GraphToolbarProps> = ({className, coins,  selectedCoin, coinHandler}) => {
  const options = useMemo(() => coins.map(coin => {
    return {value: coin.symbol, description: coin.symbol};
  }), [coins]);

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
        <Select
          options={options}
          value={selectedCoin}
          onChange={coinHandler}
        />
      </div>
    </form>
  );
}

export default GraphToolbar;