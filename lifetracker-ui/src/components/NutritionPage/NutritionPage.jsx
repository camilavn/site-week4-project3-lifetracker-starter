import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../NotFound/NotFound';
import Home from '../Home/Home';
import NutritionNew from './NutritionNew';
import NutritionDetail from './NutritionDetail';
import './NutritionPage.css';



export default function NutritionPage ({ appState }) {
  const [nutritions, setNutritions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        let response;
        let token = localStorage.getItem('token') 
          ? localStorage.getItem('token')
          : appState.token;
        if (token) {
          response = await axios.post('http://localhost:5000/nutrition', { token });
          setNutritions(response.data.nutritions);
        } else {
          alert('not authorized');
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching nutritions:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchNutritions();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="Loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="nutrition-page">
    <div className="nutrition-overview">
      <Link to="/nutrition/create">Record Nutrition</Link>
      {nutritions.length === 0 ? (
        <div className="empty-message">Nothing here yet</div>
      ) : (
        <div className="nutrition-feed">
          {nutritions.map((nutrition) => (
            <div className="nutrition-card" key={nutrition.id}>
              <p>Nutrition Id: {nutrition.id}</p>
              <div className="nutrition-name">{nutrition.name}</div>
              {nutrition.imageUrl && (
                <img
                  className="nutrition-image"
                  src={nutrition.imageUrl}
                  alt={nutrition.name}
                />
              )}
              <div className="nutrition-calories">{nutrition.calories}</div>
              <div className="nutrition-category">{nutrition.category}</div>
              {/* <div className="nutrition-date">
                {new Date(nutrition.createdAt).toLocaleDateString('en-GB')}
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>

    <NutritionNew />
    {/* <NutritionDetail /> */}
 
  </div>
  );
};

