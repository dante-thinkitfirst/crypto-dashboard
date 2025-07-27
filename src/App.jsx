import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
//API URL for the coins data.
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  // State variables to store the coins data and loading state.
  const [coins, setCoins] = useState([]);
  //Need a loading state to prevent the app from rendering before the data is fetched.
  const [loading, setLoading] = useState(true);
  //Need an error state to handle any errors that occur during the fetch.
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);
        //set the coins state to the data
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div>
      <h1>🚀 Crypto Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
