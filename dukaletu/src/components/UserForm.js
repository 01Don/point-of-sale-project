// src/components/UserForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar1 from "../pages/Sidebar1";
import "./UserForm.css";

function UserForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveUser = (ev) => {
    ev.preventDefault();

    const apiEndpoint = "http://172.233.153.32/:8000/users";

    axios
      .post(apiEndpoint, userData)
      .then((response) => {
        console.log("Data sent successfully", response.data);

        setUserData({ email: "", password: "" }); // Clear all fields
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        console.log("Data Not sent", error);
      });
  };

  return (
    <div className="center-container">
      <header>
        <nav>
          <div className="navbar">
            <div className="sidebar-toggle" onClick={toggleSidebar}>
              &#9776;
            </div>
            <h1>Create Users</h1>
          </div>
        </nav>
      </header>

      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
        </label>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSaveUser}
            className="btn btn-primary btn-lg"
          >
            Add New User
          </button>
        </div>
      </form>
      <Sidebar1 isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default UserForm;
