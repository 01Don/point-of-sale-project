import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import Loginpage from "./pages/Loginpage";
import WelcomePage from "./pages/WelcomePage";
import ManageStore from "./pages/ManageStore";
import ProductList from "./pages/ProductList";
import SalesList from "./pages/SalesList";

function App() {
  // Initialize the list of created products
  const [createdProducts, setCreatedProducts] = useState([]);

  // Function to add a created product to the list
  const handleProductCreated = (product) => {
    setCreatedProducts([...createdProducts, product]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={<HomePage createdProducts={createdProducts} />}
        />
        <Route
          path="/pos"
          element={
            <CreateProductPage onProductCreated={handleProductCreated} />
          }
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/managestore" element={<ManageStore />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/Saleslist" element={<SalesList />} />
      </Routes>
    </Router>
  );
}

export default App;
