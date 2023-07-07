import React from 'react';

export default function NutritionCard ({ nutrition }) {
  const { imageUrl, name, calories, category, createdAt } = nutrition;

  return (
    <div className="nutrition-card">
      {/* <div className="nutrition-name">{name}</div>
      {imageUrl && <img className="nutrition-image" src={imageUrl} alt={name} />}
      <div className="nutrition-calories">{calories}</div>
      <div className="nutrition-category">{category}</div>
      <div className="nutrition-date">{new Date(createdAt).toLocaleDateString('en-GB')}</div> */}
    </div>
  );
};


