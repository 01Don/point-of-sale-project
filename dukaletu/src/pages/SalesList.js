import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageStore.css";

function ManageStore() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  console.log("Data: ", sales);

  useEffect(() => {
    axios.get("http://172.233.153.32
:8000/products").then((response) => {
      setProducts(response.data);
    });

    console.log("Fetching sales data...");
    axios
      .get("http://172.233.153.32
:8000/sales")
      .then((response) => {
        console.log("Sales data fetched successfully:", response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  return (
    <div>
      <div className="table-container">
        <div className="table-container">
          <h2>List of Sales</h2>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Sale Date</th>
                <th>Product Name</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="sale-row">
                  <td>{sale.sale_date}</td>
                  <td>
                    {getProductById(sale.product_id)?.product_name || "Unknown"}
                  </td>
                  <td>Tsh {sale.prod_saleprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageStore;
