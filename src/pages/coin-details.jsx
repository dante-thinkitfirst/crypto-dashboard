import { useState, useEffect } from "react";
import { useParams } from "react-router";
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
        console.log(data);
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
    <div>
      <h1>Coin Details {id}</h1>
    </div>
  );
};

export default CoinDetailsPage;
