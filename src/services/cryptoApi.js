const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-ZhvLtD6yqEmJVmQnfUGJPxU2";

const getCoinsList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key:${API_KEY}`;
};

const searchCoin = (text) => {
  return `https://api.coingecko.com/api/v3/search?query=${text}&x-cg-demo-api-key:CG-ZhvLtD6yqEmJVmQnfUGJPxU2`;
};

const marketChart = (coin) => {
  return `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x-cg-demo-api-key:${API_KEY}`;
};

export { getCoinsList, searchCoin, marketChart };
