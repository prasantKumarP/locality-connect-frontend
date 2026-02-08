import React, { useState, useEffect } from 'react';
import { suggestionAPI } from '../services/api';
import SuggestionCard from '../components/SuggestionCard';
import CreateSuggestionModal from '../components/CreateSuggestionModal';

const Dashboard = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await suggestionAPI.getDashboard();
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoteUpdate = () => {
    fetchDashboard();
  };

  const handleSuggestionCreated = () => {
    fetchDashboard();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="card-title">Community Dashboard</h1>
          <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
            View and vote on suggestions and complaints from your locality
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + New Suggestion
        </button>
      </div>

      {suggestions.length === 0 ? (
        <div className="empty-state">
          <h3>No suggestions yet</h3>
          <p>Be the first to create a suggestion for your community!</p>
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
            style={{ marginTop: '1rem' }}
          >
            Create First Suggestion
          </button>
        </div>
      ) : (
        <div>
          {suggestions.map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              onVoteUpdate={handleVoteUpdate}
            />
          ))}
        </div>
      )}

      <CreateSuggestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuggestionCreated}
      />
    </div>
  );
};

export default Dashboard;
