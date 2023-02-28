import { useQuery } from "react-query";
import {fetchCoinTickers, fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const Label = styled.div`
	font-size: 0.9rem;
	font-weight: 700;
	opacity: 0.6;
`;

const GridItem = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	flex-direction: column;
	padding: 1rem;

	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
`;

const BigGridItem = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	grid-column: 1 / 3;
	grid-row: 1 / 2;
	padding: 1.2rem;
	justify-content: space-between;

	border-radius: 0.7rem;
	box-shadow: 0 0.2rem 0.5rem rgba(10, 10, 10, 0.1);
	& > ${Label} {
		line-height: 1.5;
	}
	& > div:last-child {
		font-size: 2rem;
		font-weight: 300;
	}
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 6rem;
	gap: 1rem;
`;

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ChartProps {
  coinId: string;
}




function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
        <div>all time high : {tickersData?.quotes.USD.ath_price}</div>
        <div>{tickersData?.quotes.USD.percent_change_7d}</div>
        <div>{tickersData?.quotes.USD.percent_change_24h}</div>
        <div>{tickersData?.quotes.USD.percent_change_12h}</div>
        <div>{tickersData?.quotes.USD.percent_change_6h}</div>
        <div>{tickersData?.quotes.USD.percent_change_1h}</div>
        <div>{tickersData?.quotes.USD.percent_change_30m}</div>
</>
      )}
    </div>
  );
}

export default Price;
