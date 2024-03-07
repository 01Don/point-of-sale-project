import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SaleList.css"; 

function SaleList() {
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

    axios.get("http://localhost:8000/sales")
      .then((response) => {
        console.log("Sales data fetched successfully:", response.data);
        setSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  

  const calculateProductPrice = (sale) => {
    const product = products.find((p) => p.prod_id === sale.prod_id);
    if (product) {
      return product.prod_saleprice * sale.prod_quantity;
    }
    return 0; // Return 0 if product not found
  };

  const calculateTotalProductPrice = () => {
    return sales.reduce((total, sale) => total + calculateProductPrice(sale), 0);
  };

  const calculateTotalQuantity = () => {
    return sales.reduce((total, sale) => total + sale.prod_quantity, 0);
  };

  return (
    <div>
      <div className="table-container">
        <h2>List of Sales</h2>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Sale Date</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              const product = products.find((p) => p.prod_id === sale.prod_id);
              const productPrice = calculateProductPrice(sale);
              return (
                <tr key={sale.id} className="sale-row">
                  <td>{sale.sale_date}</td>
                  <td>{product ? product.prod_name : "N/A"}</td>
                  <td>{sale.prod_quantity}</td>
                  <td>{productPrice}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total:</td>
              <td>{calculateTotalQuantity()}</td>
              <td>{calculateTotalProductPrice()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default SaleList;
