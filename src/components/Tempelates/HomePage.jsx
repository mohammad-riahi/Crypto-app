import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import { getCoinsList } from "../../services/cryptoApi";
import Search from "../modules/Search";
import Charts from "../modules/Charts";

function Homepage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState("");

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await fetch(getCoinsList(page, currency));
      const json = await res.json();
      setCoins(json);
      setLoading(false);
    };
    getData();
  }, [page, currency]);
  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin
        coins={coins}
        isLoading={loading}
        currency={currency}
        setChart={setChart}
      />
      <Pagination setPage={setPage} page={page} />
      {!!chart && <Charts chart={chart} setChart={setChart} />}
    </div>
  );
}

export default Homepage;
