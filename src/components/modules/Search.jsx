import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { Circles } from "react-loader-spinner";
import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsloading] = useState();

  // empty string is falsey and we dont need useEffect to run so we use ! to make our state truthy so if the value of state is not empty string useEffect is allowed to run //

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);

    if (!text) return;
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        console.log(json);
        if (json.coins) setCoins(json.coins);
        setIsloading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsloading(true);
    search();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {/* // we put two !! before coin because without them the resault of
      coin.length will be integer and the number of characters in coins but
      after using !! the resault will be changed into boolean // */}

      {(!!coins.length || isLoading) && (
        <div className={styles.searchResault}>
          {isLoading && <Circles width="30px" height="30px" />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                {coin.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
