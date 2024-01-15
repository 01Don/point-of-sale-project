import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaSignOutAlt, FaCartPlus } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest(".sidebar")) {
        toggleSidebar();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, toggleSidebar]);

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
