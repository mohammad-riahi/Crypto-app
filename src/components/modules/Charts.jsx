import { useState } from "react";
import { convertData } from "../../helpers/convertData";
import styles from "./Charts.module.css";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
} from "recharts";

function Charts({ chart, setChart }) {
  const [type, setType] = useState("prices");

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      setType(type);
    }
  };

  console.log(convertData(chart, type));
  return (
    <div className={styles.container}>
      <span className={styles.collaps} onClick={() => setChart(null)}>
        X
      </span>
      <div className={styles.chart}>
        <div className={styles.name}>
          <img src={chart.coin.image} />
          <p>{chart.coin.name}</p>
        </div>
        <div className={styles.graph}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={400}
              height={400}
              // formated
              // data
              // should
              // be
              // given
              // below

              data={convertData(chart, type)}
            >
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth="2px"
              />

              <CartesianGrid stroke="#404042" />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
              <XAxis dataKey="date" hide />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.types} onClick={typeHandler}>
          <button className={type === "prices" ? styles.selected : null}>
            Prices
          </button>
          <button className={type === "market_caps" ? styles.selected : null}>
            Market caps
          </button>
          <button className={type === "total_volumes" ? styles.selected : null}>
            Total volumes
          </button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Prices:</p>
            <span>${chart.coin.current_price}</span>
          </div>
          <div>
            <p>ATH: </p>
            <span>${chart.coin.ath}</span>
          </div>
          <div>
            <p>Market cap: </p>
            <span>{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
