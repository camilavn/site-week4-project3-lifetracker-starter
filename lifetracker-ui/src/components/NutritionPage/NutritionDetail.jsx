import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../NotFound/NotFound';

export default function NutritionDetail()  {
//   const [nutrition, setNutrition] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   let token = localStorage.getItem('token') 
//   ? localStorage.getItem('token')
//   : appState.token;

//   useEffect(() => {
//     const fetchNutrition = async () => {
//       try {
//         const response = await axios.post(`http://localhost:5000/nutrition/nutrition_id`, {token});
//         ///${nutrition_id}
//         console.log("RESPONSE DATA ND.JSX", response.data);
//         setNutrition(response.data.nutrition);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching nutrition:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchNutrition();
//   }, []);

//   if (isLoading) {
//     return <h1 className="loading">Loading...</h1>;
//   }

//   if (!nutrition) {
//     return <NotFound />;
//   }

  return (
    <div className="nutrition-detail">
      {/* <NutritionCard nutrition={nutrition} /> */}
    </div>
  );
};


