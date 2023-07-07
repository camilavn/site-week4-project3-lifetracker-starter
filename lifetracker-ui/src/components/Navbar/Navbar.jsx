import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NutritionPage from "../NutritionPage/NutritionPage";



export default function Navbar() {
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
          <Link to="/auth/register">
            <button className="btn primary">Register</button>
          </Link>
          <Link to="/auth/login">
            <button className="btn outline">Login</button>
          </Link>
          {/* if user signed in show logout button do that here turnary */}
        </div>
      </div>
    </div>
  );
}
