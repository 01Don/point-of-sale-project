import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function Loginpage() {
  const iconStyle = { color: "white" };
  const [login, setLogin] = useState({
    email: "",
    password: "",
    role: "", // Added role field
  });
  const [error, setError] = useState(null); // State for error message
  const Navigate = useNavigate(); // Used for navigation after successful login

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();

      // Check if authentication was successful
      if (data.authenticated) {
        setError(null);
        Navigate("/home");
        console.log("Login Successful");
      } else {
        setError("Email, password, or role is not correct");
      }
    } catch (error) {
      setError("Authentication failed");
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div>
      <header>
        <nav>
          <div className="back-link">
            <Link to="/">
              <IoIosArrowBack style={iconStyle} />
            </Link>
          </div>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              paddingTop: "20px",
              color: "#1A72DD",
            }}
          >
            Log In
          </h1>
        </nav>
      </header>
      <main>
        <div className="container my-3">
          <div className="bg-light p-4 mt-4 rounded-3">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={login.email}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "60px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="At least 8 characters"
                  value={login.password}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "60px" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="Role"
                  value={login.role}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "60px" }}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                >
                  Login
                </button>
              </div>
            </form>
            {error && (
              <div className="text-center text-danger mt-3">{error}</div>
            )}
            <div className="text-center" style={{ marginTop: "40px" }}>
              <Link to="/">Forgot Password ?</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loginpage;
