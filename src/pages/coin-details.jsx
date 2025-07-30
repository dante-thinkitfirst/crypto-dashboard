import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CointChart";
const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // console.log(data);
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">⬅️ Back to Home</Link>
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>
      {loading && <Spinner />}
      {error && <div className="error">❌ {error}</div>}

      {!loading && !error && (
        <>
          <img
            className="coin-details-image"
            src={coin.image.large}
            alt={coin.name}
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>
          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>
              Total Volume: $
              {coin.market_data.total_volume.usd.toLocaleString()}
            </h4>
            <h4>High 24h: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>Low 24h: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              Price Change 24h: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>

            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>

            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>

            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>

            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleString()}
            </h4>
          </div>

          <CoinChart coinId={id} />

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                🌐{" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                📈{" "}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}

            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(", ")}</p>
            )}

            {!loading && !error && !coin && (
              <p>No data available for this coin.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
