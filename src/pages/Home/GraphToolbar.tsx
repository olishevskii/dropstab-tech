import React, {ChangeEventHandler, useMemo} from "react";
import clsx from "clsx";

import {CustomFC} from "types/CustomFC";
import classes from "./GraphToolbar.css";
import {Button, Select, RadioButton} from "components";
import {GraphMode} from "components/Graph";
import {CoinDto} from "api/dto/GettingCoinListDto";

interface GraphToolbarProps {
  coins: CoinDto[];
  selectedCoin: string;
  coinHandler: ChangeEventHandler<HTMLSelectElement>;
  graphMode: string;
  graphModeHandler: ChangeEventHandler<HTMLInputElement>;
}

const GraphToolbar: CustomFC<GraphToolbarProps> = ({ className,
                                                     coins,
                                                     selectedCoin,
                                                     coinHandler,
                                                     graphMode,
                                                     graphModeHandler}) => {
  const options = useMemo(() => coins.map(coin => {
    return {value: coin.symbol, description: coin.symbol};
  }), [coins]);

  return (
    <div className={clsx(className, classes.graphToolbar)}>
      <div className={classes.container}>
        <RadioButton
          className={classes.button}
          name="graph-mode"
          value={GraphMode.DAY}
          onChange={graphModeHandler}
          checked={graphMode === GraphMode.DAY}
        >
          Day
        </RadioButton>
        <RadioButton
          className={classes.button}
          name="graph-mode"
          value={GraphMode.THREE_DAYS}
          onChange={graphModeHandler}
          checked={graphMode === GraphMode.THREE_DAYS}
        >
          3 Days
        </RadioButton>
        <RadioButton
          className={classes.button}
          name="graph-mode"
          value={GraphMode.WEEK}
          onChange={graphModeHandler}
          checked={graphMode === GraphMode.WEEK}
        >
          Week
        </RadioButton>
        <RadioButton
          className={classes.button}
          name="graph-mode"
          value={GraphMode.MONTH}
          onChange={graphModeHandler}
          checked={graphMode === GraphMode.MONTH}
        >
          Month
        </RadioButton>
      </div>
      <div className={classes.container}>
        <Button className={classes.button}>Refresh</Button>
        <Select
          options={options}
          value={selectedCoin}
          onChange={coinHandler}
        />
      </div>
    </div>
  );
}

export default GraphToolbar;