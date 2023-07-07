import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../NotFound/NotFound';
import Home from '../Home/Home';

const NutritionOverview = ({ appState }) => {
  const { error, isLoading } = appState;

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (isLoading) {
    return <Home />;
  }

  return (
    <div className="nutrition-overview">
      <Link to="/nutrition/create">Record Nutrition</Link>
      <NutritionFeed />
    </div>
  );
};

const NutritionFeed = () => {
  const [nutritions, setNutritions] = useState([]);

  useEffect(() => {
    const fetchNutritions = async () => {
      try {
        const response = await axios.get('/nutrition');
        setNutritions(response.data.nutritions);
      } catch (error) {
        console.error('Error fetching nutritions:', error);
      }
    };

    fetchNutritions();
  }, []);

  if (nutritions.length === 0) {
    return <div className="empty-message">Nothing here yet</div>;
  }

  return (
    <div className="nutrition-feed">
      {nutritions.map((nutrition) => (
        <NutritionCard key={nutrition.id} nutrition={nutrition} />
      ))}
    </div>
  );
};

const NutritionNew = () => {
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
        await axios.post('/nutrition', nutrition);
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

  const NutritionDetail = () => {
    const [nutrition, setNutrition] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    const { nutritionId } = useParams();
  
    useEffect(() => {
      const fetchNutrition = async () => {
        try {
          const response = await axios.get(`/nutrition/${nutritionId}`);
          setNutrition(response.data.nutrition);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching nutrition:', error);
          setIsLoading(false);
        }
      };
  
      fetchNutrition();
    }, [nutritionId]);
  
    if (isLoading) {
      return <h1 className="loading">Loading...</h1>;
    }
  
    if (!nutrition) {
      return <NotFound />;
    }
  
    return (
      <div className="nutrition-detail">
        <NutritionCard nutrition={nutrition} />
      </div>
    );
  };
  


  const NutritionCard = ({ nutrition }) => {
    const { imageUrl, name, calories, category, createdAt } = nutrition;
  
    return (
      <div className="nutrition-card">
        <div className="nutrition-name">{name}</div>
        {imageUrl && <img className="nutrition-image" src={imageUrl} alt={name} />}
        <div className="nutrition-calories">{calories}</div>
        <div className="nutrition-category">{category}</div>
        <div className="nutrition-date">{new Date(createdAt).toLocaleDateString('en-GB')}</div>
      </div>
    );
  };

const NutritionPage = ({ appState }) => {
  return (
    <div className="nutrition-page">
      <Router>
        <Route exact path="/nutrition" render={() => <NutritionOverview appState={appState} />} />
        <Route exact path="/nutrition/create" component={NutritionNew} />
        <Route path="/nutrition/id/:nutritionId" component={NutritionDetail} />
        <Route component={NotFound} />
      </Router>
    </div>
  );
};

export default NutritionPage;
