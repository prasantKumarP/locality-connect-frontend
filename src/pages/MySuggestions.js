import React, { useState, useEffect } from 'react';
import { suggestionAPI } from '../services/api';
import CreateSuggestionModal from '../components/CreateSuggestionModal';

const MySuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMySuggestions();
  }, []);

  const fetchMySuggestions = async () => {
    try {
      setLoading(true);
      const response = await suggestionAPI.getMy();
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this suggestion?')) {
      return;
    }

    try {
      await suggestionAPI.delete(id);
      fetchMySuggestions();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete suggestion');
    }
  };

  const handleSuggestionCreated = () => {
    fetchMySuggestions();
  };

  const newSuggestionsCount = suggestions.filter(s => s.status === 'NEW').length;
  const canCreateMore = newSuggestionsCount < 5;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading your suggestions...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="card-title">My Suggestions</h1>
          <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
            You have {newSuggestionsCount}/5 NEW suggestions. 
            {canCreateMore ? ' You can create more.' : ' Maximum reached.'}
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
          disabled={!canCreateMore}
        >
          + New Suggestion
        </button>
      </div>

      {!canCreateMore && (
        <div className="alert alert-info">
          You've reached the maximum of 5 NEW suggestions. Delete or wait for existing suggestions to change status before creating more.
        </div>
      )}

      {suggestions.length === 0 ? (
        <div className="empty-state">
          <h3>No suggestions yet</h3>
          <p>Create your first suggestion to get started!</p>
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
            <div key={suggestion.id} className="suggestion-card">
              <div className="suggestion-header">
                <div>
                  <h3 className="suggestion-title">{suggestion.title}</h3>
                  <div className="suggestion-meta">
                    <span className={`badge ${suggestion.category === 'SUGGESTION' ? 'badge-suggestion' : 'badge-complaint'}`}>
                      {suggestion.category}
                    </span>
                    <span className={`badge ${
                      suggestion.status === 'NEW' ? 'badge-new' :
                      suggestion.status === 'VALID' ? 'badge-valid' :
                      suggestion.status === 'INVALID' ? 'badge-invalid' :
                      suggestion.status === 'LATER' ? 'badge-later' :
                      'badge-discussion'
                    }`}>
                      {suggestion.status.replace('_', ' ')}
                    </span>
                    <span className="priority-badge">
                      My Priority: {suggestion.userPriority}
                    </span>
                  </div>
                  <div className="suggestion-meta">
                    <span>
                      Created: {new Date(suggestion.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <p>{suggestion.description}</p>
              </div>

              <div className="vote-section">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                  <span>👍 {suggestion.likeCount} Likes</span>
                  <span>👎 {suggestion.dislikeCount} Dislikes</span>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(suggestion.id)}
                >
                  Delete
                </button>
              </div>
            </div>
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

export default MySuggestions;
