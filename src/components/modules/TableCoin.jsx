import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { Circles } from "react-loader-spinner";
import style from "../modules/TableCoin.module.css";
import { marketChart } from "../../services/cryptoApi";

function TableCoin({ coins, isLoading, currency, setChart }) {
  // console.log(coins);
  return (
    <div className={style.container}>
      {isLoading ? (
        <Circles
          height="80"
          width="80"
          color="#5a6ec6"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <table className={style.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total volume</th>
              <th>Chart</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => (
              <TableRow
                coin={coin}
                key={coin.id}
                currency={currency}
                setChart={setChart}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ currency, setChart, coin }) => {
  const {
    id,
    name,
    symbol,
    image,
    total_volume,
    price_change_percentage_24h,
    current_price,
  } = coin;
  const showHandler = async () => {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
    }
  };

  return (
    <tr>
      <td onClick={showHandler}>
        <div className={style.symbol}>
          <img src={image} alt="coinimage" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency == "usd" ? (
          <span>USD </span>
        ) : currency == "eur" ? (
          <span>EUR </span>
        ) : (
          <span>JPY </span>
        )}
        {current_price.toLocaleString()}
      </td>
      <td
        className={
          price_change_percentage_24h > 0 ? style.success : style.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? chartUp : chartDown}
          alt={name}
        />
      </td>
    </tr>
  );
};
