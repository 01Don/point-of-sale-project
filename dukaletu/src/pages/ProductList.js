import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products data:", error);
      });

    console.log("Fetching sales data...");
    axios.get("http://localhost:8000/sales")
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
              <th>Selling Price</th>
              <th>Creation Time</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.prod_id} className="product-row">
                <td>{product.prod_name}</td>
                <td>{product.prod_quantity}</td>
                <td>Tsh {product.prod_buyprice}</td>
                <td>Tsh {product.prod_saleprice}</td>
                <td>{product.created_at}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="2">Total:</td>
              <td>Tsh {products.reduce((total, product) => total + product.prod_buyprice, 0)}</td>
              <td>Tsh {products.reduce((total, product) => total + product.prod_saleprice, 0)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
