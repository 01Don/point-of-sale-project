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

  return (
    <div>
      <div className="table-container">
        <h2>List of Products</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Buying Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="product-row">
                <td>{product.prod_name}</td>
                <td>{product.prod_quantity}</td>
                <td>Tsh {product.prod_buyprice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageStore;
