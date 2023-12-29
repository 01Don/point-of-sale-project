import React from "react";
import { Link } from "react-router-dom";
import LoginIcon from "./images/Login.png";
import WelcomeImage from "./images/wel.png";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="">
      <header className="title-text">
        <nav>
          <h1 style={{ fontWeight: "bold" }}>ShopPOS</h1>
        </nav>
      </header>
      <main>
        <div className="container my-3">
          <div className="bg-light p-4 mt-4 rounded-3">
            <h1 className="welcome-heading">Welcome to ShopPOS!</h1>
            <p className="welcome-text">
              Select login as the cashier first to continue.
            </p>
            <div className="welcome-image">
              <img
                src={WelcomeImage}
                alt="WelcomeImage"
                style={{ width: "162px", height: "187px" }} // Adjust width and height as needed
              />
            </div>
            <div>
              <Link
                to="/login"
                className="btn btn-primary mt-3 btn-login" // Add btn-login class
              >
                <img src={LoginIcon} alt="LoginIcon" /> Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
