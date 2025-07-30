import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.prices || !Array.isArray(data.prices)) {
          throw new Error("Invalid data format received from API");
        }

        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: "Price in USD",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        });
      } catch (error) {
        console.error("Chart data fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (coinId) {
      fetchPrices();
    }
  }, [coinId]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart: {error}</p>;
  if (!chartData) return <p>No chart data available</p>;

  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: { unit: "day" },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
