import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaSignOutAlt, FaCartPlus } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        Close Sidebar
      </button>
      <ul className="sidebar-links">
        <li>
          <Link to="/home">
            <FaCartPlus className="icon" /> Sale
          </Link>
        </li>
        <li>
          <Link to="/pos">
            <FaUser className="icon" /> Create Product
          </Link>
        </li>
        <li>
          <a href="/">
            <FaSignOutAlt className="icon" /> Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
