import axios from "axios";
import React, { useState } from "react";

export default function SaleForm({ products }) {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({});
  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("Data: ", formData);
    let newSales = sales;
    newSales.push({ ...formData });
    setSales(newSales);
    setFormData({});
    ev.target.reset();
  };
  const handeChange = (ev) => {
    let { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const deleteItem = (prod_id) => {
    console.log("PDelete", prod_id, sales);
    setSales((prev) => prev.filter((s) => parseInt(s.prod_id) !== prod_id));
  };

  const handlePostSales = (ev) => {
    let url = "http://172.233.153.32

:8000/sales";
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
          console.log("Products", products, s);
          let found = products.find((p) => p.prod_id === parseInt(s.prod_id));
          console.log("Found: ", found);
          return (
            <div className="del">
              <li className="flex">
                <p>
                  {found.prod_name} - {s.prod_quantity}
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
              value={formData["prod_id"]}
              name="prod_id"
              onChange={handeChange}
              required
              className="input-form"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.prod_id} value={p.prod_id}>
                  {p.prod_name}
                </option>
              ))}
            </select>
          </div>
          <div className="quantity-control">
            <label>Quantity</label>
            <input
              value={formData["quantity"]}
              type="number"
              name="prod_quantity"
              placeholder="Qty"
              required
              onChange={handeChange}
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
