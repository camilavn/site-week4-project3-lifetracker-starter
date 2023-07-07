import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login({ setAppState }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      if (res?.data?.token) {
        // Save the token in local storage or cookie
        localStorage.setItem("token", res.data.token);

        // Set the app state to indicate the user is logged in
        setAppState({ user: res.data.user, isLoggedIn: true });

        setIsLoading(false);
        navigate("/auth/activity"); // Redirect to the dashboard or any protected route
      } else {
        setErrors((e) => ({ ...e, form: "Invalid username/password combination" }));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }));
      setIsLoading(false);
    }
  };

  return (
    <div className="Login">
      <div className="card">
        <h2>Login to Lifetracker</h2>

        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/auth/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
