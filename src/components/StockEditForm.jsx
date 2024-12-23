import React, { useState, useEffect } from "react";
import axios from "axios";

const StockEditForm = ({ stock, onClose }) => {
  const [formData, setFormData] = useState({ ...stock });

  useEffect(() => {
    setFormData({ ...stock });
  }, [stock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:2024/api/stocks/${formData.id}`, formData)
      .then((response) => {
        onClose();
        window.location.reload(); // Refresh page or handle state update
      })
      .catch((error) => console.error("Error updating stock:", error));
  };

  return (
    <div>
      <h2>Edit Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Stock Name:</label>
          <input
            type="text"
            name="stockName"
            value={formData.stockName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ticker:</label>
          <input
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Buy Price:</label>
          <input
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-btn">
  <i className="fas fa-save"></i> Save
</button> &nbsp;
<button type="button" onClick={onClose} className="cancel-btn">
  <i className="fas fa-times"></i> Cancel
</button>

      </form>
    </div>
  );
};

export default StockEditForm;
