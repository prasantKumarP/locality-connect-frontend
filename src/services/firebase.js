import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDemoKey123456789",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "locality-connect.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://locality-connect-default-rtdb.firebaseio.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "locality-connect",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "locality-connect.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Realtime Database instance
export const database = getDatabase(app);

export default app;
