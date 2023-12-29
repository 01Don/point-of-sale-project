import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons library

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={toggleSidebar}>
        Close Sidebar
      </button>
      <ul className="sidebar-links">
        <li>
          <Link to="/pos">
            <FaPlus className="icon" /> Create Product
          </Link>
        </li>
        <li>
          <Link to="/ManageStore">
            <FaUser className="icon" /> Manage Store Account
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
