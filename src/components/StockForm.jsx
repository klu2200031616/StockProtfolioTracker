import React, { useState } from "react";
import axios from "axios";
import './stockform.css'; // Import the CSS file

const StockForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure quantity and buyPrice are numbers
    const quantityNumber = parseInt(quantity, 10);
    const buyPriceNumber = parseFloat(buyPrice);

    axios
      .post("http://localhost:2024/api/stocks", { 
        stockName: name, 
        ticker, 
        quantity: quantityNumber, 
        buyPrice: buyPriceNumber 
      })
      .then((response) => {
        // On success, show an alert and trigger the onSave callback
        alert("Stock added successfully!");
        onSave(response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the stock!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <div className="form-container">
        <label htmlFor="stock-name">Stock Name:</label>
        <input 
          id="stock-name"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Stock Name" 
          required
        />
        
        <label htmlFor="ticker">Ticker:</label>
        <input 
          id="ticker"
          type="text" 
          value={ticker} 
          onChange={(e) => setTicker(e.target.value)} 
          placeholder="Ticker" 
          required
        />
        
        <label htmlFor="quantity">Quantity:</label>
        <input 
          id="quantity"
          type="number" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          placeholder="Quantity" 
          required
        />
        
        <label htmlFor="buy-price">Buy Price:</label>
        <input 
          id="buy-price"
          type="number" 
          value={buyPrice} 
          onChange={(e) => setBuyPrice(e.target.value)} 
          placeholder="Buy Price" 
          required
        />
        
        <button type="submit" className="save-btn">
          <i className="fas fa-save"></i> Save
        </button>
      </div>
    </form>
  );
};

export default StockForm;
