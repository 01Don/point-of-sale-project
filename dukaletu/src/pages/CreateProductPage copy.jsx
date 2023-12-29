import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BucketIcon from './images/Bucket.png';
import axios from 'axios';

function CreateProductPage() {
  const [product, setProduct] = useState({
    name: '',
    buyingPrice: '',
    sellingPrice: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSaveProduct = async () => {
    try {
      // Validate input data (e.g., check if fields are not empty and numeric values are valid)
      if (!product.name || isNaN(product.buyingPrice) || isNaN(product.sellingPrice)) {
        console.error('Invalid input data');
        return;
      }

      const dataToSend = {
        name: product.name,
        buyingPrice: parseFloat(product.buyingPrice),
        sellingPrice: parseFloat(product.sellingPrice),
        category: product.category,
      };

      const response = await axios.post('http://172.233.153.32:8000/products', dataToSend);

      if (response.status === 201) {
        console.log('Product added successfully');
        setProduct({
          name: '',
          buyingPrice: '',
          sellingPrice: '',
          category: '',
        });
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
     <header>
        <nav className="navbar bg-primary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              ShopPOS
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="container my-3" style={{ width: '400px' }}>
          <div className="bg-light p-4 mt-4 rounded-3">
            <h1 style={{ fontWeight: 'bold' }}>Product Details</h1>
            <form>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="productName"
                  placeholder="Super Loaf"
                  value={product.name}
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
                  name="buyingPrice"
                  id="buyingPrice"
                  placeholder="1200.00"
                  value={product.buyingPrice}
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
                  name="sellingPrice"
                  id="sellingPrice"
                  placeholder="1800.00"
                  value={product.sellingPrice}
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
                  name="category"
                  id="category"
                  placeholder="Category"
                  value={product.category}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="btn btn-primary btn-lg"
                  style={{ width: '331px', marginTop: '90px' }}
                >
                  Add New Product
                </button>
              </div>
              <div className="text-center" style={{ color: 'red', marginTop: '40px' }}>
                <img src={BucketIcon} alt="Bucket Icon" /> Delete Product
              </div>
            </form>
            <Link to="/" className="btn btn-primary mt-3">
              Back to Point of Sale
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateProductPage;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from './images/Cart.png';

function HomePage() {
  const [productList, setProductList] = useState([{ name: '', quantity: '' }]);

  const handleAddProduct = () => {
    setProductList([...productList, { name: '', quantity: '' }]);
  };

  const handleProductChange = (index, event) => {
    const updatedProductList = [...productList];
    updatedProductList[index][event.target.name] = event.target.value;
    setProductList(updatedProductList);
  };

  return (
    <div>
      <header>
        <nav className="navbar bg-primary " style={{maxWidth:'380px', }}>
          ShopPOS
        </nav>
      </header>
      <main>
        <div style={{ maxWidth: '400px' }} className="container my-3">
          <div className="bg-light p-4 mt-4 rounded-3">
            <h1  className="text-center" style={{ fontWeight: 'bold' }}>Sale</h1>
            <form>
              {productList.map((product, index) => (
                <div key={index} className="mb-4 d-flex justify-content-center">
                  <div>
                    <label htmlFor={`productName${index}`} className="form-label"
                    style={{ fontWeight: 'bold' }}
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id={`productName${index}`}
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, e)}
                      className="form-control"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor={`productQuantity${index}`} className="form-label"
                    style={{ fontWeight: 'bold' }}
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id={`productQuantity${index}`}
                      placeholder="Qty"
                      value={product.quantity}
                      onChange={(e) => handleProductChange(index, e)}
                      className="form-control"
                      style={{ width: '80px' }}
                    />
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="btn btn-warning btn-lg"
                >
                  Add 
                </button>
              </div>
            </form>
            {/* Moved black div below the form with aligned text */}
            <div
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px',
                width: '300px',
                margin: 'auto',
                marginTop: '200px',
                display: 'flex',
                justifyContent: 'space-between',
                borderRadius: '5px',
              }}
            >
              <div  style={{ fontWeight: 'bold' }}> <img src={cartIcon} alt="Cart Icon" /> 0 Item</div>
              <div  style={{ fontWeight: 'bold' }}>Total: Tsh0.00</div>
            </div>
            {/* Styled "Save" button with a gradient blue background */}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-lg"
                style={{
                  background: 'linear-gradient(90deg, #0069D9 0%, #00B4D8 100%)',
                  color: 'white',
                }}
              >
                Save
              </button>
            </div>
            <Link to="/pos" className="btn btn-primary mt-3">
              Click here to Create Products
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
