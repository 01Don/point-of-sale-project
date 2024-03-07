// RegistrationPage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function RegistrationPage() {
  const iconStyle = { color: "white" };
  const [registration, setRegistration] = useState({
    email: "", // Using email as both email and username
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistration({
      ...registration,
      [name]: value,
    });
  };

  // Function to toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle user registration
  const handleRegistration = async () => {
    // Validate passwords match
    if (registration.password !== registration.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send registration request to the server
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      // Registration successful, you can redirect or perform other actions
      console.log("Registration successful");
      setRegistration({
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
    } catch (error) {
      setError("Registration failed");
      console.error("Error during registration:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost

:8000/delete-account?email=${registration.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Account deletion failed");
      }

      console.log("Account deletion successful");
    } catch (error) {
      setError("Account deletion failed");
      console.error("Error during account deletion:", error);
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
            Register
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
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={registration.email}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "20px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="At least 8 characters"
                    value={registration.password}
                    onChange={handleInputChange}
                    className="form-control"
                    style={{ backgroundColor: "white", marginBottom: "20px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Input for Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={registration.confirmPassword}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "20px" }}
                />
              </div>

              {/* Input for User Role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  User Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  placeholder="User Role"
                  value={registration.role}
                  onChange={handleInputChange}
                  className="form-control"
                  style={{ backgroundColor: "white", marginBottom: "60px" }}
                />
              </div>

              {/* Registration Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleRegistration}
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%" }}
                >
                  Register
                </button>
              </div>

              {/* Delete Account Button */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="btn btn-danger btn-lg mt-3"
                  style={{ width: "100%" }}
                >
                  Delete Account
                </button>
              </div>
            </form>

            {/* Display Error Message */}
            {error && (
              <div className="text-center text-danger mt-3">{error}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;
