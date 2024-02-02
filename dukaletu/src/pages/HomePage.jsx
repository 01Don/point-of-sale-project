import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";
import Sidebar from "./Sidebar";
import SaleForm from "../components/SaleForm";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    prod_id: "",
    prod_quantity: "",
  });

  const [sales, setSales] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [additionalProducts, setAdditionalProducts] = useState([{ data }]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProductCount, setSelectedProductCount] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://172.233.153.32

:8000/products");
        console.log("Product Names Response:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product names:", error);
      }
    }

    fetchProducts();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const apiEndpoint = "http://172.233.153.32

:8000/sales";

    // Collect all sales data, including additional product input fields
    const allSalesData = [
      {
        prod_id: data.prod_id,
        prod_quantity: data.prod_quantity,
      },
      ...additionalProducts,
    ];

    console.log("Data State:", data);
    console.log("Additional Products State:", additionalProducts);
    console.log("Request Payload:", allSalesData);

    axios
      .post(apiEndpoint, {})
      .then((response) => {
        console.log("Data sent successfully", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  const onChange = (ev) => {
    const { name, value } = ev.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProductInput = () => {
    setAdditionalProducts([...additionalProducts, { data }]);
  };

  return (
    <div>
      <header>
        <nav>
          <div className="navbar">
            <div className="sidebar-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
            <h1>Sale</h1>
          </div>
        </nav>
      </header>
      <main>
        <div>
          <div>
            {/* <form onSubmit={handleSubmit}>
              <div className="input-container">
                <div className="left-input">
                  <label className="bold-label">Product Name</label>
                  <div>
                    <select
                      name="prod_id"
                      onChange={onChange}
                      required
                      className="select-field"
                    >
                      <option value="">Select Product</option>
                      {products.map((p) => (
                        <option key={p.prod_id} value={p.prod_id}>
                          {p.prod_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="right-input">
                  <label className="bold-label">Quantity</label>
                  <div>
                    <input
                      type="number"
                      name="prod_quantity"
                      placeholder="Qty"
                      onChange={onChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="add-button" onClick={addProductInput}>
                  Add
                </button>
              </div>

              <div className="button-container">
                <button className="blue-button">Save</button>
              </div>
            </form> */}
            <SaleForm products={products} />
          </div>
        </div>
      </main>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default HomePage;
