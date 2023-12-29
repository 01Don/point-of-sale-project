import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateProductPage.css";
import Sidebar1 from "./Sidebar1";

function CreateProductPage() {
  const [product, setProduct] = useState({
    prod_name: "",
    prod_buyprice: "",
    prod_saleprice: "",
    prod_category: "",
    prod_quantity: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // ... Your useEffect for fetching products
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSaveProduct = (ev) => {
    ev.preventDefault();

    const apiEndpoint = "http://172.233.153.32:8000/products";

    axios
      .post(apiEndpoint, product)
      .then((response) => {
        console.log("Data sent successfully", response.data);

        setProduct({
          prod_name: "",
          prod_buyprice: "",
          prod_saleprice: "",
          prod_category: "",
          prod_quantity: "",
        });
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div>
      <header>
        <nav>
          <div className="navbar">
            <div className="sidebar-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
            <h1>Add Product</h1>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <div className="container my-3">
          <div className="bg-light p-4 mt-4 rounded-3">
            <h1>Product Details</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="prod_name"
                  id="prod_name"
                  placeholder="Enter Product Name"
                  value={product.prod_name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="buyingPrice" className="form-label">
                  Buying Price
                </label>
                <input
                  type="number"
                  name="prod_buyprice"
                  id="prod_buyprice"
                  placeholder="Enter Buying Price"
                  value={product.prod_buyprice}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sellingPrice" className="form-label">
                  Selling Price
                </label>
                <input
                  type="number"
                  name="prod_saleprice"
                  id="pro_saleprice"
                  placeholder="Enter Selling Price"
                  value={product.prod_saleprice}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  name="prod_category"
                  id="prod_category"
                  placeholder="Category"
                  value={product.prod_category}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  name="prod_quantity"
                  id="prod_quantity"
                  placeholder="Enter Quantity"
                  value={product.prod_quantity}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="btn btn-primary btn-lg"
                >
                  Add New Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Sidebar1 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default CreateProductPage;
