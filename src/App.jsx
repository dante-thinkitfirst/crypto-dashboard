import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Homepage from "./pages/home";
import AboutPage from "./pages/about";

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
  //State variable to store the filter value.
  const [filter, setFilter] = useState("");
  //State variable to store the sort by value.
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // console.log(data);
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
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
};

export default App;
