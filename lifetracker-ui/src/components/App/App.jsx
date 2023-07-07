import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import NotFound from '../NotFound/NotFound';
import axios from 'axios';

export default function App() {
  const [appState, setAppState] = useState({
    user: null,
    token: null
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:5000/auth/me', { token });
          setAppState({ ...appState, user: response.data });
        } catch (error) {
          console.error('Error fetching user data from auth/me:', error);
        }
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="app">
      <Router>
        <Navbar user={appState.user} appState={appState} setAppState={setAppState}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register setAppState={setAppState} />} />
          <Route path="/auth/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/auth/activity"
            element={
              (appState.user || localStorage.getItem('token')) ? <ActivityPage appState={appState} /> : <AccessForbidden />
            }
          />
          <Route
            path="/nutrition/*"
            element={
              (appState.user || localStorage.getItem('token')) ? <NutritionPage /> : <AccessForbidden />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

