import React, { useState, useEffect } from "react";
import axios from "axios";
import StockEditForm from "./StockEditForm"; // Import the edit form
import './stocklist.css'; // Import the CSS file

const StockList = ({ onDelete }) => {
  const [stocks, setStocks] = useState([]);
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    // Fetch stocks from backend
    axios.get("https://backend-stockportfolio-production.up.railway.app/api/stocks")
      .then((response) => setStocks(response.data))
      .catch((error) => console.error("Error fetching stocks:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://backend-stockportfolio-production.up.railway.app/api/stocks/${id}`)
      .then(() => {
        setStocks(stocks.filter(stock => stock.id !== id));
        onDelete(id);
      })
      .catch((error) => console.error("Error deleting stock:", error));
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
  };

  const handleCloseEdit = () => {
    setEditingStock(null);
  };

  return (
    <div className="table-container">
      <table className="stock-table">
        <thead>
          <tr>
            <th>Stock Name</th>
            <th>Ticker</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Price</th> {/* Add the Current Price column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan="6">No stocks available</td>
            </tr>
          ) : (
            stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.stockName}</td>
                <td>{stock.ticker}</td>
                <td>{stock.quantity}</td>
                <td>{stock.buyPrice}</td>
                <td>{stock.currentPrice || "Loading..."}</td> {/* Display the current price */}
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(stock)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(stock.id)}>
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {editingStock && (
        <div className="edit-form-container">
          <StockEditForm stock={editingStock} onClose={handleCloseEdit} />
        </div>
      )}
    </div>
  );
};

export default StockList;
