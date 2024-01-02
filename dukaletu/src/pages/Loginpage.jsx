import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./Loginpage.css";

function Loginpage() {
  const iconStyle = { color: "white" };
  const [login, setLogin] = useState({
    email: "",
    password: "",
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

  const handleLogin = () => {
    // Check if the entered email and password match the expected values
    if (login.email === "user1@gmail.com" && login.password === "010101") {
      // Reset any previous error message
      setError(null);

      // Navigate to the desired page after successful login (e.g., WelcomePage)
      Navigate("/home");

      // Optionally, you can store user login state or token in your app
      // For now, let's just log a successful login message
      console.log("Login Successful");
    } else {
      // Display an error message if the email or password is incorrect
      setError("Email or password is not correct");
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
