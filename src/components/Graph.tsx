import React, {useCallback, useMemo} from "react";
import {CustomFC} from "types/CustomFC";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement, Tooltip, Filler} from "chart.js";
import {Exchange} from "api/dto/GettingHourlyExchangeDto";
import {DateUtil} from "utils/DateUtil";

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
  mode?: string;
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

  const getDate = useCallback((daysAgo: number) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate((date.getDay() + 1) - daysAgo);

    return date;
  }, []);

  const limitDates = useMemo(() => {
    const todayDate = new Date();
    const twoDayAgoDate = getDate(2);
    const weekAgoDate = getDate(6);
    const monthAgoDate = getDate(29);

    const dates = new Map<string, Date>();
    dates.set(GraphMode.DAY, todayDate);
    dates.set(GraphMode.THREE_DAYS, twoDayAgoDate);
    dates.set(GraphMode.WEEK, weekAgoDate);
    dates.set(GraphMode.MONTH, monthAgoDate);

    return dates;
  }, []);

  const preparedExchange = useMemo(() => {
    const result: Exchange[] = [];

    const threeDayAgoDate = new Date();
    threeDayAgoDate.setHours(0, 0, 0, 0);
    threeDayAgoDate.setDate(threeDayAgoDate.getDay() - 1);

    exchanges.forEach((exchange) => {
      const exchangeDate = new Date(exchange.time * 1000);
      if(DateUtil.isGreaterOrEqualDay(limitDates.get(mode), exchangeDate)) {
        result.push(exchange);
      }
    });

    return result;
  }, [exchanges, mode]);

  const labels = useMemo((): string[] => {
    return preparedExchange.map(exchange => {
      const hour = new Date(exchange.time * 1000).getHours();
      const prepareHour = hour > 9 ? hour.toString() : '0' + hour;
      return `${prepareHour}:00`;
    });
  }, [preparedExchange]);

  const graphData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Volume',
          data: preparedExchange.map(exchange => exchange.volume),
          borderColor: 'rgb(10,154,133)',
          backgroundColor: 'rgba(10,154,133,0.5)',
        },
      ],
    };
  }, [labels, preparedExchange]);

  return <Line options={options} data={graphData} />;
}
export default Graph;