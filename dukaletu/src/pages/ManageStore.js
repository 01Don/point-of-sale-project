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
    // ... Your useEffect for fetching products
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/products").then((response) => {
      setProducts(response.data);
    });
    console.log("Fetching sales data...");
    axios
      .get("http://localhost:8000/sales")
      .then((response) => {
        console.log("Sales data fetched successfully:", response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  // Calculate total monthly revenue
  const calculateTotalMonthlyRevenue = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
    const currentYear = currentDate.getFullYear();

    const monthlySales = sales.filter((sale) => {
      const saleDate = new Date(sale.date);
      return (
        saleDate.getMonth() + 1 === currentMonth &&
        saleDate.getFullYear() === currentYear
      );
    });

    const totalRevenue = monthlySales.reduce(
      (total, sale) => total + sale.price,
      0
    );

    return totalRevenue;
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
            <p>{products.length}</p>
          </div>
          <div className="summary-box">
            <i className="fas fa-dollar-sign"></i>
            <p>Total Sales</p>
            <p>{sales.length}</p>
          </div>
          <div className="summary-box">
            <i className="fas fa-chart-line"></i>
            <p>Total Monthly Revenue</p>
            <p>Tsh {calculateTotalMonthlyRevenue()}</p>
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
      </div>
      <Sidebar2 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default ManageStore;
