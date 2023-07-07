import React, { useState } from 'react';
import axios from 'axios';

export default function NutritionNew()  {
  const [nutrition, setNutrition] = useState({
    name: '',
    calories: 1,
    imageUrl: '',
    category: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setNutrition({ ...nutrition, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        let token = localStorage.getItem('token') 
          ? localStorage.getItem('token')
          : appState.token;
      await axios.post('http://localhost:5000/nutrition/create', {token, nutrition});
      setNutrition({
        name: '',
        calories: 1,
        imageUrl: '',
        category: '',
      });
      setError(null);
      setIsSubmitting(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nutrition-new">
      <h2>Create New Nutrition</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={nutrition.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="calories"
          value={nutrition.calories}
          onChange={handleChange}
          placeholder="Calories"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={nutrition.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="category"
          value={nutrition.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      </form>
    </div>
  );
};


