import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Loading = () => <div>Loading...</div>;

const ActivityPage = ({ appState, setAppState }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryStats, setSummaryStats] = useState(null);

  useEffect(() => {
    const fetchSummaryStats = async () => {
      setIsProcessing(true);
      
      try {
        // Perform the API call to fetch summary statistics
        const response = await axios.get("http://localhost:5000/auth/activity");
        console.log(response);
        const data = await response.json();

        // Update the state with the fetched summary statistics
        setSummaryStats(data.nutrition.calories);

        setIsProcessing(false);
      } catch (error) {
        console.error('Error fetching summary statistics:', error);
        setIsProcessing(false);
      }
    };

    fetchSummaryStats();
  }, []);

  const ActivityFeed = () => (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category</h4>
        {summaryStats?.perCategory.map(({ category, avgCaloriesPerCategory }) => (
          <SummaryStat
            key={category}
            stat={avgCaloriesPerCategory.toFixed(1)}
            label="calories"
            substat={category}
          />
        ))}
      </div>
      <div className="per-day">
        <h4>Total Calories Per Day</h4>
        {summaryStats?.perDay.map(({ date, totalCaloriesPerDay }) => (
          <SummaryStat
            key={date}
            stat={Math.floor(totalCaloriesPerDay)}
            label="calories"
            substat={new Date(date).toLocaleDateString('en-GB')}
          />
        ))}
      </div>
    </div>
  );

  const SummaryStat = ({ stat, label, substat }) => (
    <div className="summary-stat">
      <div className="primary-statistic">{stat}</div>
      <div className="stat-label">{label}</div>
      <div className="secondary-statistic">{substat}</div>
    </div>
  );

  return (
    <div className="activity-page">
      {isProcessing ? (
        <Loading />
      ) : (
        <ActivityFeed />
      )}
    </div>
  );
};

export default ActivityPage;


