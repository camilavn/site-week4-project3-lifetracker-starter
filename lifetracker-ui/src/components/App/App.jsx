import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ActivityPage from '../ActivityPage/ActivityPage';
import NutritionPage from '../NutritionPage/NutritionPage';
import AccessForbidden from '../AccessForbidden/AccessForbidden';
import NotFound from '../NotFound/NotFound';

export default function App() {
  const [appState, setAppState] = useState({});

  return (
    <div className="app">
      <Router>
        <Navbar user={appState.user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<Register setAppState={setAppState} />} />
          <Route path="/auth/login" element={<Login setAppState={setAppState} />} />
          <Route
            path="/auth/activity"
            element={
              appState.user ? <ActivityPage /> : <AccessForbidden />
            }
          />
          <Route
            path="/nutrition/*"
            element={
              appState.user ? <NutritionPage /> : <AccessForbidden />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

