import React from 'react';
import { compose, graphql } from 'react-apollo';
import App from '../../../components/crypto/App';
import Coin from '../../../components/crypto/coins/Coin';
import connect from '../../../redux';
import withData from '../../../apollo/withData';
import { coinInfoQuery, coinDetailsQuery } from '../../../components/crypto/graphql/coins';
import OrderBookAnalysis from '../../../components/crypto/coins/OrderBookAnalysis';
import CoinsPageMenu from '../../../components/crypto/coins/CoinsPageMenu';

const CoinInfo = ({
  symbol, toSymbol, exchange, coin: { coin }, toCoin: { coin: toCoin },
}) => (
  <App
    title={`${symbol}/${toSymbol}/${exchange}`}
    visibleTitle={coin && <Coin coin={coin} toCoin={toCoin} exchange={exchange} />}
    menu={<CoinsPageMenu activeItem={1} symbol={symbol} toSymbol={toSymbol} exchange={exchange} />}
  >
    {coin && toCoin && (
      <OrderBookAnalysis
        symbol={symbol}
        toSymbol={toSymbol}
        exchange={exchange}
      />
    )}
  </App>
);

const mapStateToProps = (state, props) => {
  const exchange = props.url.query.exchange || state.settings.defaultExchange;
  const symbol = props.url.query.symbol || 'BTC';
  const toSymbol = props.url.query.toSymbol || state.settings.defaultCurrency;
  return {
    exchange,
    symbol,
    toSymbol,
  };
};


export default withData(connect(mapStateToProps)(compose(
  graphql(coinDetailsQuery, { name: 'coin', options: props => ({ variables: { symbol: props.symbol } }) }),
  graphql(coinInfoQuery, { name: 'toCoin', options: props => ({ variables: { symbol: props.toSymbol } }) }),
)(CoinInfo)));