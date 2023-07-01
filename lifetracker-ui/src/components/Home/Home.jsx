import { Link } from "react-router-dom"
import "./Home.css"

export default function Home(){
    return(
        <div className="Home">
      <div className="actions">
        <div className="links">
          <Link to="/auth/register">
            <button className="btn primary">Register</button>
          </Link>
          <Link to="/auth/login">
            <button className="btn outline">Login</button>
          </Link>
        </div>
      </div>
    </div>
    )
}