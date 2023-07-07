import { Link } from "react-router-dom"
import "./Home.css"
import Navbar from "../Navbar/Navbar"
import { useState } from "react"


export default function Home(){

    return(
        <div className="Home">
            <h1>Lifetracker</h1>
            <h2>Track your life activities</h2>
            <div className="card">
              <img src="https://lifetracker.up.railway.app/assets/tracker-2a96bfd0.jpg" alt="tracker" />
            </div>
        </div>
    )
}