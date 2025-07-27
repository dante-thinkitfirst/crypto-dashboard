import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
//API URL for the coins data.
const API_URL = import.meta.env.VITE_API_URL;
// "&order=market_cap_desc&per_page=10&page=1&sparkline=false"

const App = () => {
  // State variables to store the coins data and loading state.
  const [coins, setCoins] = useState([]);
  //Need a loading state to prevent the app from rendering before the data is fetched.
  const [loading, setLoading] = useState(true);
  //Need an error state to handle any errors that occur during the fetch.
  const [error, setError] = useState(null);
  //State variable to store the limit of coins to fetch.
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
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
  }, [limit]);

  return (
    <div>
      <h1>🚀 Crypto Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <div className="error">Error: {error}</div>}
      <LimitSelector limit={limit} onLimitChange={setLimit} />
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
