import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [stockPrices, setStockPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topStock, setTopStock] = useState("None");

  useEffect(() => {
    axios
      .get("http://localhost:2024/api/stocks")
      .then((response) => {
        setPortfolio(response.data);
        calculateTotalValue(response.data);
      })
      .catch((error) => console.error("Error fetching stocks:", error));

    const fetchStockPrices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2024/api/stocks/real-time-prices"
        );
        setStockPrices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock prices:", error);
        setLoading(false);
      }
    };

    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const calculateTotalValue = (stocks) => {
    let total = 0;
    stocks.forEach((stock) => {
      total += stock.quantity * stock.buyPrice;
    });
    setTotalValue(total);
    calculateTopStock(stocks);
  };

  const calculateTopStock = (stocks) => {
    let top = { name: "None", value: 0 };
    stocks.forEach((stock) => {
    
      const value = stock.quantity * stock.currentPrice;

      if (value > top.value) {
        top = { name: stock.stockName, value };
      }
    });
    setTopStock(top.name);
  };

  const barChartData = {
    labels: portfolio.map((stock) => stock.stockName),
    datasets: [
      {
        label: "Buy Price × Quantity",
        data: portfolio.map((stock) => stock.buyPrice * stock.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Current Price × Quantity",
        data: portfolio.map((stock) => {
          
          return stock.quantity * stock.currentPrice;
        }),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Portfolio Dashboard</h2>
      <div className="portfolio-summary">
        <div className="total-value">Total Value: ${totalValue}</div>
        <div className="top-performing">
          Top Performing Stock: {topStock}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="chart-container">
            <h3>Portfolio Distribution</h3>
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Portfolio Distribution (Grouped Bar Chart)",
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
