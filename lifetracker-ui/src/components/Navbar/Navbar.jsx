import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

export default function Navbar({ appState, setAppState }) {
  
  const handleLogout = () => {
    // Clear user data and token from local storage
    localStorage.removeItem("token");
    setAppState({ ...appState, user: null, token: null });
  };

  return (
    <div>
      <div className="Navbar">
        <Link to="/">
          <div className="logo">
            <h2>CVN</h2>
          </div>
        </Link>
        <Link to="/auth/activity">
          <div className="activity">
            <button className="btn primary">Activity</button>
          </div>
        </Link>
        <Link to="/nutrition">
          <div className="nutrition">
            <button className="btn primary">Nutrition</button>
          </div>
        </Link>
        <div className="userauth">
          {!appState.user && !localStorage.getItem("token") && (
            <Link to="/auth/register">
              <button className="btn primary">Register</button>
            </Link>
          )}
          {!appState.user && !localStorage.getItem("token") && (
            <Link to="/auth/login">
              <button className="btn outline">Login</button>
            </Link>
          )}
          {(appState.user || localStorage.getItem("token")) && (
            <button className="btn outline" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
