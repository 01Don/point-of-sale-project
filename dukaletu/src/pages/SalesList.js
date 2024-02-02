import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageStore.css";

function ManageStore() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  console.log("Data: ", sales);

  useEffect(() => {
    axios.get("http://172.233.153.32:8000/products").then((response) => {
      setProducts(response.data);
    });

    console.log("Fetching sales data...");
    axios
      .get("http://172.233.153.32:8000/sales")
      .then((response) => {
        console.log("Sales data fetched successfully:", response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  const handleGenerateReport = (reportType) => {
    // Add logic to fetch different reports based on reportType
    axios.get(`http://172.233.153.32:8000/reports/${reportType}`)
      .then((response) => {
        console.log(`${reportType} report fetched successfully:`, response.data);
        // Handle the retrieved report data as needed
      })
      .catch((error) => {
        console.error(`Error fetching ${reportType} report:`, error);
      });
  };

  return (
    <div>
      <div className="table-container">
        <div className="table-container">
          <h2>List of Sales</h2>
          <button onClick={() => handleGenerateReport('day')}>Generate Day Report</button>
          <button onClick={() => handleGenerateReport('week')}>Generate Week Report</button>
          <button onClick={() => handleGenerateReport('month')}>Generate Month Report</button>
         
          <table className="sales-table">
            <thead>
              <tr>
                <th>Sale Date</th>
                <th>Product Name</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                const product = products.find((p) => p.id === sale.product_id);
                return (
                  <tr key={sale.id} className="sale-row">
                    <td>{sale.sale_date}</td>
                    <td>{product ? product.product_name : "N/A"}</td>
                    <td>Tsh {sale.prod_saleprice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageStore;
