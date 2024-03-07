import React, { useState } from "react";
import axios from "axios";

export default function SaleForm({ products, setProducts }) { // Add setProducts as a prop
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    prod_id: '', // Initialize with an empty string
    prod_quantity: '' // Initialize with an empty string
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { prod_id, prod_quantity } = formData;
    
    // Find the product in the products array
    const product = products.find((p) => p.prod_id === parseInt(prod_id));
    
    if (!product) {
      // Handle the case where the selected product is not found
      alert("Selected product not found");
      return;
    }
    
    // Check if the quantity exceeds the available stock
    if (parseInt(prod_quantity) > product.prod_quantity) {
      // Handle the case where the quantity exceeds available stock
      alert("Insufficient stock for this product");
      return;
    }
    
    // Reduce the quantity by the sold quantity
    const updatedProducts = products.map((p) =>
      p.prod_id === parseInt(prod_id)
        ? { ...p, prod_quantity: p.prod_quantity - parseInt(prod_quantity) }
        : p
    );
    
    // Update the products array with the new quantities
   
    // Add the sale to the sales array
    const newSales = [...sales, { ...formData }];
    setSales(newSales);
    
    // Reset form data and form
    setFormData({ prod_id: "", prod_quantity: "" });
    ev.target.reset();
  };
  

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deleteItem = (prod_id) => {
    setSales((prev) => prev.filter((s) => parseInt(s.prod_id) !== prod_id));
  };

  const handlePostSales = () => {
    const url = "http://localhost:8000/sales";
    axios
      .post(url, sales)
      .then((res) => {
        console.log("Response: ", res);
        setSales([]);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <div className="sales-form">
      <ul className="sales-list">
      {sales.map((s, idx) => {
  const foundProduct = products.find((p) => p.prod_id === parseInt(s.prod_id));
  if (!foundProduct) return null; // Skip rendering if product not found
  return (
    <div key={idx} className="del">
      <li className="flex">
        <p>
          {foundProduct.prod_name} - Quantity: {s.prod_quantity} - Price: Tsh {foundProduct.prod_saleprice * s.prod_quantity }
        </p>
        <button
          type="button"
          onClick={() => deleteItem(parseInt(s.prod_id))}
          className="del-button"
        >
          DEL
        </button>
      </li>
    </div>
  );
})}

      </ul>
      <form onSubmit={handleSubmit} className="form">
        <div className="fields">
          <div className="product-control">
            <label>Product</label>
            <select
              value={formData["prod_id"] || ''} // Ensure a default value if undefined
              name="prod_id"
              onChange={handleChange}
              required
              className="input-form"
            >
              <option value="">Select Product</option>
              {products
              .filter((p) => p.prod_quantity > 0)
              .map((p) => (
                <option key={p.prod_id} value={p.prod_id}>
                  {p.prod_name}
                </option>
              ))}
            </select>
          </div>
          <div className="quantity-control">
            <label>Quantity</label>
            <input
              value={formData["prod_quantity"]}
              type="number"
              name="prod_quantity"
              placeholder="Qty"
              required
              onChange={handleChange}
              className="input-form1"
            />
          </div>
        </div>
        <div className="add-button-container">
          <button className="add-button">Add</button>
        </div>
      </form>
      <div className="submit-container">
        <button
          type="button"
          onClick={handlePostSales}
          className="submit-button"
        >
          Submit Sales
        </button>
      </div>
    </div>
  );
}
