import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import Navbar from "./components/Navbar";
import "./App.css"; // Import global styles

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/" element={<Dashboard />} /> {/* Use 'element' instead of 'component' */}
        <Route path="/add-stock" element={<StockForm />} /> {/* Use 'element' */}
        <Route path="/stock-list" element={<StockList />} /> {/* Use 'element' */}
      </Routes>
    </Router>
  );
};

export default App;
