import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageStore.css";
import { Link } from "react-router-dom";
import Sidebar2 from "./Sidebar2";

function ManageStore() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  console.log("Data: ", sales);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch products and sales data
    axios.get("http://localhost:8000/products").then((response) => {
      setProducts(response.data);
    });
    axios
      .get("http://localhost:8000/sales")
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate total products remaining in stock
  const calculateTotalProductsInStock = () => {
    return products.reduce((total, product) => total + product.prod_quantity, 0);
  };

  // Calculate total product value
  const calculateTotalProductValue = () => {
    return products.reduce((total, product) => total + (product.prod_quantity * product.prod_buyprice), 0);
  };

  // Find products that are running low in stock
const findProductsRunningLow = () => {
  const lowStockThreshold = 0.1; // 10% threshold

  return products.filter((product) => {
    const remainingPercentage = product.prod_quantity / product.initial_quantity;
    return remainingPercentage <= lowStockThreshold;
  });
};

  return (
    <div className="page-container">
      <header>
        <nav>
          <div className="navbar">
            <div className="sidebar-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
            <h1>Dashboard</h1>
          </div>
        </nav>
      </header>
      <div className="body-summary">
        <div className="summary-row">
          <div className="summary-box">
            <i className="fas fa-cube"></i>
            <p>Total Products</p>
            <p>{calculateTotalProductsInStock()}</p>
          </div>
          <div className="summary-box">
            <i className="fas fa-dollar-sign"></i>
            <p>Total Product Value</p>
            <p>Tsh {calculateTotalProductValue()}</p>
          </div>
          <div className="summary-box">
            <i className="fas fa-chart-line"></i>
            <p>Total Monthly Revenue</p>
            <p>Tsh</p>
          </div>
        </div>

        <div className="additional-section">
          <h2>Check Out</h2>
          <Link to="/ProductList" className="styled-link">
            Product List
          </Link>
          <Link to="/SalesList" className="styled-link">
            Sales List
          </Link>
        </div>

        <div className="alert-section">
          <h2>Alert: </h2>
          <ul>
            {findProductsRunningLow().map((product) => (
              <li key={product.prod_id}>{product.prod_name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Sidebar2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default ManageStore;
