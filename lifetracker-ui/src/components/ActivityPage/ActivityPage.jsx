import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './ActivityPage.css';

const Loading = () => <div>Loading...</div>;

const ActivityPage = ({ appState, setAppState }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaryStats, setSummaryStats] = useState(null);

  useEffect(() => {
    const fetchSummaryStats = async () => {
      setIsProcessing(true);
      
      try {
        // Perform the API call to fetch summary statistics
        let response
        let token = localStorage.getItem("token") 
          ? localStorage.getItem("token")
          : appState.token
        if (token) {
          response = await axios.post("http://localhost:5000/auth/activity", {token});
        } else {
          alert('not authorized')
        }
  
        // Update the state with the fetched summary statistics
        setSummaryStats(response.data.nutrition.calories);
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
        {summaryStats && (
          <SummaryStat label={summaryStats.perDay.date} stat={summaryStats.perCategory.avgcaloriespercategory} substat={summaryStats.perCategory.category} ></SummaryStat>
        )}
      </div>
      <div className="per-day">
        <h4>Average Total Calories Per Day</h4>
        {summaryStats && (
          <SummaryStat label={summaryStats.perDay.date} stat={summaryStats.perDay.totalcaloriesperday} substat={summaryStats.perCategory.category} ></SummaryStat>
        )}
      </div>
    </div>
  );

  const SummaryStat = ({ label, stat, substat }) => (
    <div className="summary-stat">
      <div className="stat-label">{label}</div>
      <div className="primary-statistic">{stat}</div>
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


