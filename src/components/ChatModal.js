import React, { useState, useEffect, useRef } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../services/firebase';
import { chatAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ChatModal = ({ isOpen, onClose, suggestion }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && suggestion) {
      initializeChat();
    }

    return () => {
      // Cleanup Firebase listener when modal closes
      if (chatData?.firebaseChatId) {
        const messagesRef = ref(database, `chats/${chatData.firebaseChatId}/messages`);
        off(messagesRef);
      }
    };
  }, [isOpen, suggestion]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Initializing chat for suggestion:', suggestion.id);
      
      // Get or create chat from backend
      const response = await chatAPI.getOrCreateChat(suggestion.id);
      console.log('Chat data received:', response.data);
      setChatData(response.data);
      
      // Check if Firebase is available
      if (!database) {
        throw new Error('Firebase database not initialized. Check your .env file and Firebase configuration.');
      }
      
      // Listen to Firebase messages
      const messagesRef = ref(database, `chats/${response.data.firebaseChatId}/messages`);
      console.log('Listening to Firebase path:', `chats/${response.data.firebaseChatId}/messages`);
      
      onValue(messagesRef, (snapshot) => {
        console.log('Firebase snapshot received');
        const data = snapshot.val();
        console.log('Firebase data:', data);
        
        if (data) {
          const messagesList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          
          // Sort by timestamp
          messagesList.sort((a, b) => a.timestamp - b.timestamp);
          console.log('Messages loaded:', messagesList.length);
          setMessages(messagesList);
        } else {
          console.log('No messages yet');
          setMessages([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('Firebase listener error:', error);
        setError('Failed to connect to Firebase: ' + error.message);
        setLoading(false);
      });
      
    } catch (error) {
      console.error('Error initializing chat:', error);
      setError(error.message || 'Failed to initialize chat');
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    setSending(true);
    setError(null);
    
    try {
      console.log('Sending message:', newMessage);
      await chatAPI.sendMessage(suggestion.id, newMessage.trim());
      setNewMessage('');
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message: ' + (error.response?.data?.message || error.message));
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal chat-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Discussion</h2>
            <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              {suggestion.title}
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="chat-container">
          {loading ? (
            <div className="loading" style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Loading chat...</p>
              <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.5rem' }}>
                Connecting to Firebase...
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-error" style={{ margin: '2rem' }}>
              <h3>Error</h3>
              <p>{error}</p>
              <button 
                className="btn btn-primary" 
                onClick={initializeChat}
                style={{ marginTop: '1rem' }}
              >
                Retry
              </button>
              <details style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                <summary>Troubleshooting Steps</summary>
                <ol style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  <li>Check that .env file exists with Firebase config</li>
                  <li>Verify REACT_APP_FIREBASE_DATABASE_URL is correct</li>
                  <li>Open browser console (F12) for detailed errors</li>
                  <li>Check Firebase Console - Database should be enabled</li>
                </ol>
              </details>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <p>No messages yet. Start the discussion!</p>
                    {chatData && (
                      <p style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '0.5rem' }}>
                        Chat ID: {chatData.firebaseChatId}
                      </p>
                    )}
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.userId === user.id ? 'own-message' : 'other-message'}`}
                    >
                      <div className="message-header">
                        <span className="message-username">{message.username}</span>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                      <div className="message-text">{message.text}</div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-form">
                <input
                  type="text"
                  className="chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={sending}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={sending || !newMessage.trim()}
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;