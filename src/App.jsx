import { useState, useEffect } from "react";
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
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        //we will see the data twice in the console.log because of how strict mode works in react
        console.log(data);
        setCoins(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return <h1>🚀 Crypto Dash</h1>;
};

export default App;
