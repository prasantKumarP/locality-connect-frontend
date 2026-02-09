import React, { useState, useEffect } from 'react';
import { suggestionAPI } from '../services/api';
import SuggestionCard from '../components/SuggestionCard';
import ChatModal from '../components/ChatModal';

const DiscussionForum = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const response = await suggestionAPI.getDiscussion();
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoteUpdate = () => {
    fetchDiscussions();
  };

  const handleOpenChat = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedSuggestion(null);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading discussion forum...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 className="card-title">Discussion Forum</h1>
          <p style={{ color: '#7f8c8d', marginTop: '0.5rem' }}>
            Suggestions that received majority support and moved to discussion
          </p>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="empty-state">
          <h3>No discussions yet</h3>
          <p>
            When suggestions receive enough support (50%+ likes within the voting period),
            they'll appear here for community discussion.
          </p>
        </div>
      ) : (
        <div>
          <div className="alert alert-info" style={{ marginBottom: '2rem' }}>
            <strong>Priority System:</strong> Priority 1 = Highest (100+ likes), Priority 5 = Lowest (&lt;10 likes)
            <br />
            <strong>💬 New:</strong> Click "Join Discussion" to chat about any suggestion!
          </div>
          
          {suggestions.map((suggestion) => (
            <div key={suggestion.id}>
              <SuggestionCard
                suggestion={suggestion}
                onVoteUpdate={handleVoteUpdate}
              />
              <div style={{ marginTop: '-1rem', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <button
                  className="chat-btn"
                  onClick={() => handleOpenChat(suggestion)}
                >
                  💬 Join Discussion
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSuggestion && (
        <ChatModal
          isOpen={isChatOpen}
          onClose={handleCloseChat}
          suggestion={selectedSuggestion}
        />
      )}
    </div>
  );
};

export default DiscussionForum;
