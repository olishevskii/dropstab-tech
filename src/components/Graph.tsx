import React, {useMemo} from "react";
import {CustomFC} from "../types/CustomFC";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip, Filler} from "chart.js";
import {Exchange} from "../api/dto/GettingHourlyExchangeDto";
import {DateUtil} from "../util/DateUtil";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export enum GraphMode {
  DAY = 'day',
  THREE_DAYS = 'three-days',
  WEEK = 'week',
  MONTH = 'month',
}

export interface LinearGraphProps {
  exchanges: Exchange[];
  mode?: GraphMode;
}

const Graph: CustomFC<LinearGraphProps> = ({exchanges, mode = GraphMode.DAY}) => {
  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }), []);

  const labels = useMemo((): string[] => {
    if (mode === GraphMode.DAY) {
      const currentHour = new Date().getHours();
      return Array.from(Array(currentHour + 1)
        .keys())
        .map(hour => {
          const preparedHour = hour > 9 ? hour : '0' + hour;
          return preparedHour + ':00';
        });
    }
  }, [mode]);

  const preparedData = useMemo(() => {
    const result = [];

    exchanges.forEach((exchange) => {
      const todayDate = new Date();
      const exchangeDate = new Date(exchange.time * 1000);
      if(DateUtil.isSimilarDay(todayDate, exchangeDate)) {
        result.push(exchange.volume);
      }
    });

    return result;
  }, [exchanges]);

  const defaultData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Volume',
        data: preparedData,
        borderColor: 'rgb(10,154,133)',
        backgroundColor: 'rgba(10,154,133,0.5)',
      },
    ],
  };

  console.log(preparedData);

  return <Line options={options} data={defaultData}/>;
}
export default Graph;