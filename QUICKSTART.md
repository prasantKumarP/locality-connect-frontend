# Locality Connect Frontend - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd locality-connect-frontend
npm install
```

### Step 2: Ensure Backend is Running
Make sure your Spring Boot backend is running on `http://localhost:8080`

```bash
# In backend directory
mvn spring-boot:run
```

### Step 3: Start Frontend
```bash
npm start
```

App opens at: `http://localhost:3000`

---

## 📱 First Time User Flow

### 1. Register Account
- Navigate to `http://localhost:3000/register`
- Fill in:
  - Username: `john_doe`
  - Email: `john@example.com`
  - Password: `password123`
  - Full Name: `John Doe`
  - Locality: Select from dropdown
- Click "Register"
- You'll be auto-logged in!

### 2. Create Your First Suggestion
- Click "+ New Suggestion" button
- Fill in:
  - Title: "Install Speed Breakers"
  - Description: "Need speed breakers near playground"
  - Category: Suggestion
  - Priority: 1 (Highest)
- Click "Create Suggestion"

### 3. Vote on Community Suggestions
- View Dashboard to see all NEW suggestions
- Click 👍 Like or 👎 Dislike
- Your vote is saved instantly!

### 4. Track Your Suggestions
- Click "My Suggestions" in navbar
- See all your suggestions
- Track likes and dislikes
- Delete if needed

### 5. Check Discussion Forum
- Click "Discussion Forum" in navbar
- See suggestions with 50%+ support
- Sorted by priority (1 = highest)

---

## 🎯 Key Features

### Dashboard
✅ View all NEW suggestions from your locality  
✅ Vote with like/dislike  
✅ Create new suggestions (max 5 NEW at a time)  
✅ Real-time updates  

### My Suggestions
✅ Personal suggestion management  
✅ Priority ordering (1-5)  
✅ Delete functionality  
✅ Vote statistics  

### Discussion Forum
✅ View popular suggestions (50%+ likes)  
✅ System-calculated priority  
✅ Community engagement  

---

## 🔑 API Integration

The frontend automatically connects to backend at `http://localhost:8080`

**All API calls include:**
- JWT token authentication
- Error handling
- Automatic retry on 401

**Available Endpoints:**
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/suggestions/dashboard` - Dashboard
- `POST /api/suggestions` - Create suggestion
- `POST /api/votes` - Vote

---

## 🎨 Pages Overview

### `/login` - Login Page
- Username and password
- Link to registration

### `/register` - Registration Page
- User details form
- Locality selection
- Auto-login on success

### `/dashboard` - Main Dashboard
- All NEW suggestions
- Create button
- Voting interface

### `/my-suggestions` - Personal Suggestions
- Your suggestions
- Create/delete
- Stats tracking

### `/discussion` - Discussion Forum
- IN_DISCUSSION suggestions
- Priority-sorted
- Community voting

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
npm start
```

### Backend Not Connected
- Verify backend is running: `http://localhost:8080`
- Check proxy in `package.json`
- Look for CORS errors in browser console

### Cannot Create Suggestion
- Check you don't have 5 NEW suggestions already
- Go to "My Suggestions" and delete one if needed

### Votes Not Working
- Ensure you're logged in (check navbar for username)
- Refresh the page
- Check browser console for errors

---

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.js      # Top navigation
│   ├── SuggestionCard.js  # Display suggestions
│   └── CreateSuggestionModal.js  # Create form
├── pages/             # Page components
│   ├── Login.js       # Login page
│   ├── Register.js    # Registration page
│   ├── Dashboard.js   # Main dashboard
│   ├── MySuggestions.js  # Personal suggestions
│   └── DiscussionForum.js  # Discussion forum
├── context/           # React Context
│   └── AuthContext.js # Authentication state
├── services/          # API integration
│   └── api.js         # Axios configuration
└── index.css          # Global styles
```

---

## 🧪 Testing the App

### Test Multi-User Voting

1. **Register User 1**
   - Username: `user1`
   - Create a suggestion

2. **Open Incognito Window**
   - Register User 2
   - Username: `user2`
   - Vote on User 1's suggestion

3. **Open Another Incognito**
   - Register User 3
   - Username: `user3`
   - Vote on same suggestion

4. **Check Results**
   - Refresh User 1's page
   - See updated vote counts
   - If 50%+ likes, moves to Discussion

---

## 🎓 Learning Resources

### React Concepts Used
- **Functional Components** - All components use hooks
- **useState** - Local state management
- **useEffect** - Side effects and data fetching
- **useContext** - Global auth state
- **React Router** - Navigation
- **Custom Hooks** - useAuth

### API Integration
- **Axios Interceptors** - Token injection
- **Async/Await** - Promise handling
- **Error Handling** - Try/catch blocks
- **Token Storage** - localStorage

---

## 📝 Next Steps

1. ✅ Register and login
2. ✅ Create a suggestion
3. ✅ Vote on others' suggestions
4. ✅ Check discussion forum
5. ⭐ Customize the UI
6. ⭐ Add more features

---

## 🚀 Production Build

```bash
# Create optimized build
npm run build

# Serve locally
npx serve -s build

# Deploy to Vercel
vercel deploy

# Deploy to Netlify
netlify deploy
```

---

## 🐛 Common Errors

**Error: "Cannot read property 'map' of undefined"**
- Solution: Add loading state before rendering lists

**Error: "401 Unauthorized"**
- Solution: Re-login to get new token

**Error: "Network Error"**
- Solution: Check if backend is running

---

## 💡 Pro Tips

1. **Open DevTools** (F12) to see API calls and errors
2. **Use React DevTools** extension to debug components
3. **Check Network Tab** to see all API requests
4. **Use Console** for debugging state changes

---

Happy coding! 🎉

For full documentation, see README.md
