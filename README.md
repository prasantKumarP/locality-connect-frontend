# Locality Connect - React Frontend

A modern React frontend application for the Locality Connect community feedback platform.

## Features

### 🔐 Authentication
- User login and registration
- JWT token-based authentication
- Automatic token refresh
- Protected routes

### 📊 Dashboard
- View all NEW suggestions from your locality
- Real-time like/dislike voting
- Filter by category (Suggestion/Complaint)
- Status badges and priority indicators

### 📝 My Suggestions
- Create up to 5 NEW suggestions at a time
- Set personal priority (1-5)
- Edit and delete your suggestions
- Track voting statistics

### 💬 Discussion Forum
- View suggestions that reached voting threshold
- System-calculated priority based on likes
- Community engagement metrics

### 🎨 UI/UX Features
- Responsive design for mobile and desktop
- Clean, modern interface
- Real-time updates
- Intuitive navigation
- Loading states and error handling

## Tech Stack

- **React 18.2** - UI framework
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## Project Structure

```
locality-connect-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── SuggestionCard.js
│   │   ├── CreateSuggestionModal.js
│   │   └── PrivateRoute.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── MySuggestions.js
│   │   └── DiscussionForum.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Backend API running on `http://localhost:8080`

### 1. Install Dependencies
```bash
cd locality-connect-frontend
npm install
```

### 2. Configure API Endpoint
The app uses a proxy configuration in `package.json`:
```json
"proxy": "http://localhost:8080"
```

If your backend runs on a different port, update this value.

### 3. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

The production build will be in the `build/` directory.

## API Integration

### API Service (`src/services/api.js`)

The app uses Axios with interceptors for:
- **Request Interceptor**: Adds JWT token to all requests
- **Response Interceptor**: Handles 401 errors and redirects to login

### Available APIs

**Authentication**
- `authAPI.login(credentials)` - User login
- `authAPI.register(userData)` - User registration

**Localities**
- `localityAPI.getAll()` - Get all localities
- `localityAPI.getById(id)` - Get locality details

**Suggestions**
- `suggestionAPI.create(data)` - Create new suggestion
- `suggestionAPI.getMy()` - Get user's suggestions
- `suggestionAPI.getDashboard()` - Get dashboard suggestions
- `suggestionAPI.getDiscussion()` - Get discussion forum
- `suggestionAPI.delete(id)` - Delete suggestion

**Votes**
- `voteAPI.cast(data)` - Cast/change/remove vote

## Pages Overview

### Login (`/login`)
- Username and password authentication
- Link to registration
- Error handling

### Register (`/register`)
- User registration form
- Locality selection dropdown
- Validation and error messages

### Dashboard (`/dashboard`)
- All NEW suggestions from locality
- Create new suggestion button
- Vote on suggestions
- Real-time updates

### My Suggestions (`/my-suggestions`)
- Personal suggestion management
- Create (max 5 NEW at a time)
- Delete functionality
- Priority ordering
- Vote statistics

### Discussion Forum (`/discussion`)
- IN_DISCUSSION suggestions
- System priority display
- Community voting
- Sorted by priority

## Components

### Navbar
- Navigation links
- User info display
- Logout functionality
- Responsive design

### SuggestionCard
- Displays suggestion details
- Like/dislike buttons
- Status and priority badges
- Category indicators

### CreateSuggestionModal
- Modal form for creating suggestions
- Title, description, category
- Priority selection (1-5)
- Validation

### PrivateRoute
- Protects authenticated routes
- Redirects to login if not authenticated
- Loading state handling

## Context API

### AuthContext
Manages authentication state:
- `user` - Current user object
- `login(credentials)` - Login function
- `register(userData)` - Registration function
- `logout()` - Logout function
- `isAdmin()` - Check if user is admin
- `loading` - Loading state

## Styling

The app uses custom CSS with:
- CSS variables for theming
- Responsive breakpoints
- Component-scoped styles
- Mobile-first approach

### Key Style Classes
- `.card` - Card container
- `.btn-primary` - Primary button
- `.badge-*` - Status badges
- `.suggestion-card` - Suggestion display
- `.modal-overlay` - Modal backdrop

## Environment Variables

Create `.env` file for custom configuration:
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Usage Flow

1. **New User Registration**
   - Navigate to `/register`
   - Fill in details and select locality
   - Auto-login after registration

2. **Login**
   - Navigate to `/login`
   - Enter credentials
   - Redirected to dashboard

3. **Create Suggestion**
   - Click "New Suggestion" button
   - Fill in modal form
   - Select category and priority
   - Submit

4. **Vote on Suggestions**
   - View dashboard or discussion forum
   - Click like/dislike buttons
   - Vote counts update immediately
   - Can change or remove vote

5. **Manage Suggestions**
   - Navigate to "My Suggestions"
   - View all personal suggestions
   - Delete if needed
   - Track vote statistics

## Business Logic

### Suggestion Limits
- Maximum 5 suggestions with NEW status per user
- Must delete or wait for status change to create more
- Warning shown when limit reached

### Voting System
- One vote per user per suggestion
- Toggle same vote to remove
- Click opposite vote to change
- Updates backend immediately

### Status Flow
- **NEW** → Created, visible on dashboard
- **VALID** → Voting period ended, likes > dislikes
- **INVALID** → Voting period ended, dislikes > likes
- **LATER** → Voting period ended, tie
- **IN_DISCUSSION** → Reached 50%+ likes within period

## Troubleshooting

### Common Issues

**Issue: "Network Error" or API calls failing**
- Ensure backend is running on port 8080
- Check proxy configuration in package.json
- Verify CORS is enabled on backend

**Issue: "Token expired" errors**
- Token expires after 24 hours (default)
- User will be auto-redirected to login
- Re-login to get new token

**Issue: Cannot create suggestion**
- Check if you have 5 NEW suggestions already
- Delete one or wait for status change
- Verify all required fields are filled

**Issue: Votes not updating**
- Refresh the page
- Check network tab for API errors
- Verify you're logged in

## Development Tips

### Hot Reload
Changes to React components will hot-reload automatically.

### Debug Mode
Open browser DevTools → Console for error messages and API logs.

### Testing Voting
- Register multiple users
- Create suggestions with one user
- Vote with other users
- Watch status transitions

## Deployment

### Build for Production
```bash
npm run build
```

### Serve with Static Server
```bash
npm install -g serve
serve -s build -p 3000
```

### Deploy to Vercel/Netlify
1. Connect Git repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

### Environment-Specific Configuration
Create `.env.production`:
```
REACT_APP_API_URL=https://your-api.com/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- [ ] Real-time updates using WebSocket
- [ ] Push notifications
- [ ] Image upload for suggestions
- [ ] Comments section
- [ ] Search and filters
- [ ] Admin dashboard
- [ ] Analytics charts
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.
