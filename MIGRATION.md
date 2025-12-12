# Firebase to Backend Migration Guide

This document describes the migration from Firebase (hosting-only) to a full Node.js/Express/MongoDB backend.

## What Changed

### Before
- ✗ Firebase hosting only
- ✗ Firebase Authentication
- ✗ In-memory admin data (lost on refresh)
- ✗ Static mock data from JSON files
- ✗ No persistent database

### After
- ✓ Node.js/Express backend API
- ✓ JWT-based authentication
- ✓ MongoDB persistent storage
- ✓ RESTful API with validation
- ✓ Role-based authorization
- ✓ Structured logging
- ✓ Secure password hashing

## Breaking Changes

### 1. Authentication

**Before (Firebase):**
```typescript
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/config/firebase'

await signInWithEmailAndPassword(auth, email, password)
```

**After (JWT):**
```typescript
import { authApi } from '@/lib/api'

const { data } = await authApi.login(email, password)
// Token is automatically stored in localStorage
```

### 2. Data Fetching

**Before (Mock Data):**
```typescript
import eventsData from '@/mocks/events.json'

const events = eventsData.events
```

**After (API):**
```typescript
import { eventsApi } from '@/lib/api'

const { data } = await eventsApi.getAll()
```

### 3. Admin Context

**Before (In-Memory):**
```typescript
// Data stored in React state
const [events, setEvents] = useState(mockEvents)
```

**After (Database):**
```typescript
// Data fetched from API
const { data } = await eventsApi.getAll()
```

## Migration Steps

### 1. Update Environment Variables

**Frontend `.env`:**
```diff
+ VITE_API_BASE_URL=http://localhost:5000/api

# Firebase (keep for hosting config only)
VITE_FIREBASE_API_KEY=...
```

**Backend `server/.env`:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlabs
JWT_SECRET=<your-secret-minimum-32-characters>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### 2. Install Dependencies

```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies (if needed)
npm install
```

### 3. Setup MongoDB

```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:6

# Or install locally
brew install mongodb-community@6.0  # macOS
```

### 4. Create Admin User

```bash
cd server
npm run create-admin
```

Follow the prompts to create an admin account.

### 5. Update Auth Flow

Users need to:
1. Navigate to `/login`
2. Enter admin credentials
3. Token is stored automatically
4. Admin dashboard is now accessible at `/admin`

### 6. Update API Calls

Replace all mock data imports with API calls:

```diff
- import eventsData from '@/mocks/events.json'
+ import { eventsApi } from '@/lib/api'

- const events = eventsData.events
+ const { data } = await eventsApi.getAll()
```

## API Endpoints Reference

### Authentication
```
POST   /api/auth/login       - Login user
POST   /api/auth/register    - Register new user
GET    /api/auth/me          - Get current user (protected)
```

### Events
```
GET    /api/events           - Get all events
GET    /api/events/:id       - Get event by ID
POST   /api/events           - Create event (admin)
PUT    /api/events/:id       - Update event (admin)
DELETE /api/events/:id       - Delete event (admin)
```

### Blog Posts
```
GET    /api/blog-posts       - Get all blog posts
GET    /api/blog-posts/:id   - Get blog post by ID
POST   /api/blog-posts       - Create blog post (admin)
PUT    /api/blog-posts/:id   - Update blog post (admin)
DELETE /api/blog-posts/:id   - Delete blog post (admin)
```

## Authentication Flow

### Login Process
1. User enters email and password on `/login`
2. Frontend sends POST to `/api/auth/login`
3. Backend validates credentials
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Frontend redirects to `/admin`

### Protected Routes
```typescript
// Routes that require authentication
<ProtectedRoute requireAdmin>
  <AdminPage />
</ProtectedRoute>
```

### Token Storage
```typescript
// Token is automatically handled by API client
const token = localStorage.getItem('authToken')

// Include in requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Logout Process
```typescript
// Remove token from localStorage
authApi.logout()
navigate('/login')
```

## Data Models

### User
```typescript
{
  _id: string
  email: string
  password: string (hashed)
  role: 'admin' | 'user'
  firstName?: string
  lastName?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Event
```typescript
{
  _id: string
  title: string
  slug: string
  type: EventType
  date: Date
  location: string
  blurb: string
  description?: string
  imageUrl?: string
  registrationUrl?: string
  capacity?: number
  registeredCount: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
```

### BlogPost
```typescript
{
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  author: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}
```

## Security Considerations

### Password Hashing
- Using bcrypt with 10 salt rounds
- Passwords never stored in plain text
- Password field excluded from JSON responses

### JWT Tokens
- Tokens expire after 7 days (configurable)
- Stored in localStorage
- Included in Authorization header
- Verified on every protected request

### CORS
- Whitelist specific origins
- Default: `http://localhost:3000`
- Configure in backend `.env`

### Input Validation
- All inputs validated with Zod
- Schema validation on API boundaries
- Type-safe TypeScript throughout

### Logging
- PII automatically redacted
- Structured logging with Pino
- Request/response logging
- Error tracking with trace IDs

## Troubleshooting

### "Token is invalid or expired"
- Token expired after 7 days
- User needs to login again
- Clear localStorage and login

### "MongoDB connection failed"
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB port (default: 27017)

### "CORS error"
- Check `CORS_ORIGIN` in backend `.env`
- Must match frontend URL exactly
- Default: `http://localhost:3000`

### "Cannot create admin user"
- Check MongoDB connection
- Ensure user doesn't already exist
- Verify password is at least 8 characters

### "401 Unauthorized"
- User not logged in
- Token expired or invalid
- Need to login at `/login`

## Rollback Plan

If you need to rollback to Firebase:

1. Restore Firebase Auth context:
```bash
git checkout HEAD~1 -- src/features/auth/contexts/AuthContext.tsx
```

2. Restore old admin context:
```bash
git checkout HEAD~1 -- src/features/admin/contexts/AdminContext.tsx
```

3. Remove backend environment variables

4. Restart frontend without backend

## Testing the Migration

### 1. Test Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@techlabs.com","password":"yourpassword"}'
```

### 2. Test Protected Routes
```bash
# Create event (needs token)
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","slug":"test","type":"workshop","date":"2024-12-20","location":"Online","blurb":"Test"}'
```

### 3. Test Public Routes
```bash
# Get events (no token needed)
curl http://localhost:5000/api/events
```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs (Pino structured logs)
3. Check MongoDB connection and data
4. Verify environment variables
5. Check browser console for frontend errors

## Resources

- [Backend README](./server/README.md)
- [Backend Setup Guide](./docs/backend-setup.md)
- [Main README](./README.md)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT.io](https://jwt.io/)
