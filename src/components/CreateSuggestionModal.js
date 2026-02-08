import React, { useState } from 'react';
import { suggestionAPI } from '../services/api';

const CreateSuggestionModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'SUGGESTION',
    userPriority: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await suggestionAPI.create({
        ...formData,
        userPriority: parseInt(formData.userPriority),
      });
      
      setFormData({
        title: '',
        description: '',
        category: 'SUGGESTION',
        userPriority: 1,
      });
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create suggestion');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Suggestion</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength="200"
              placeholder="Brief title for your suggestion"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength="2000"
              placeholder="Detailed description of your suggestion or complaint"
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="SUGGESTION">Suggestion</option>
              <option value="COMPLAINT">Complaint</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Priority (1 = Highest, 5 = Lowest) *</label>
            <select
              name="userPriority"
              value={formData.userPriority}
              onChange={handleChange}
              required
            >
              <option value="1">1 - Highest Priority</option>
              <option value="2">2 - High Priority</option>
              <option value="3">3 - Medium Priority</option>
              <option value="4">4 - Low Priority</option>
              <option value="5">5 - Lowest Priority</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'Creating...' : 'Create Suggestion'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSuggestionModal;
