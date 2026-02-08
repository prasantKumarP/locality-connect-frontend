import React, { useState } from 'react';
import { voteAPI } from '../services/api';

const SuggestionCard = ({ suggestion, onVoteUpdate, showActions = true }) => {
  const [voting, setVoting] = useState(false);
  const [userVote, setUserVote] = useState(null);

  const handleVote = async (voteType) => {
    if (voting) return;
    
    setVoting(true);
    try {
      await voteAPI.cast({
        suggestionId: suggestion.id,
        voteType: voteType,
      });
      
      // Toggle vote if same type, otherwise switch
      if (userVote === voteType) {
        setUserVote(null);
      } else {
        setUserVote(voteType);
      }
      
      if (onVoteUpdate) {
        onVoteUpdate();
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert(error.response?.data?.message || 'Failed to vote');
    } finally {
      setVoting(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      NEW: 'badge-new',
      VALID: 'badge-valid',
      INVALID: 'badge-invalid',
      LATER: 'badge-later',
      IN_DISCUSSION: 'badge-discussion',
    };
    return `badge ${statusClasses[status] || 'badge-new'}`;
  };

  const getCategoryBadge = (category) => {
    return `badge ${category === 'SUGGESTION' ? 'badge-suggestion' : 'badge-complaint'}`;
  };

  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <div>
          <h3 className="suggestion-title">{suggestion.title}</h3>
          <div className="suggestion-meta">
            <span className={getCategoryBadge(suggestion.category)}>
              {suggestion.category}
            </span>
            <span className={getStatusBadge(suggestion.status)}>
              {suggestion.status.replace('_', ' ')}
            </span>
            {suggestion.userPriority && (
              <span className="priority-badge">
                Priority: {suggestion.userPriority}
              </span>
            )}
            {suggestion.calculatedPriority && (
              <span className="priority-badge">
                System Priority: {suggestion.calculatedPriority}
              </span>
            )}
          </div>
          <div className="suggestion-meta">
            <span>By: {suggestion.username}</span>
            <span>
              {new Date(suggestion.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <p>{suggestion.description}</p>
      </div>

      {showActions && (
        <div className="vote-section">
          <button
            className={`vote-btn ${userVote === 'LIKE' ? 'active-like' : ''}`}
            onClick={() => handleVote('LIKE')}
            disabled={voting}
          >
            👍 Like ({suggestion.likeCount})
          </button>
          <button
            className={`vote-btn ${userVote === 'DISLIKE' ? 'active-dislike' : ''}`}
            onClick={() => handleVote('DISLIKE')}
            disabled={voting}
          >
            👎 Dislike ({suggestion.dislikeCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
