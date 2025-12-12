# TechLabs MVP - Full Stack Application

A modern, full-stack web application for TechLabs built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI) v7** for beautiful UI components
- **React Router v7** for routing
- **React Query** for data fetching and caching
- **JWT Authentication** (replaced Firebase Auth)
- **Protected Admin Dashboard** with analytics
- **Responsive Design** mobile-first approach
- **Performance Optimized** with code splitting and lazy loading

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure access
- **Role-based Authorization** (admin/user)
- **Request Validation** with Zod
- **Structured Logging** with Pino
- **RESTful API** with proper error handling
- **TypeScript** for type safety

## 📋 Prerequisites

- Node.js >= 18.x
- MongoDB >= 6.x
- npm or yarn

## 🛠️ Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd techlabs-mvp
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Set Up MongoDB

**Using Docker (recommended):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

**Or install locally:**
- macOS: `brew install mongodb-community@6.0 && brew services start mongodb-community`
- Ubuntu: See [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
- Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 5. Configure Environment Variables

**Frontend (.env):**
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (server/.env):**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlabs
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

**Important:** Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6. Create Admin User

Run this script to create an admin user:

```bash
node server/scripts/create-admin.js
```

Or manually in MongoDB:
```javascript
// Connect to MongoDB shell
mongosh techlabs

// Create admin user (replace password hash)
db.users.insertOne({
  email: "admin@techlabs.com",
  password: "$2b$10$...",  // Use bcrypt to hash your password
  role: "admin",
  firstName: "Admin",
  lastName: "User",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🚀 Running the Application

### Development Mode

You need **3 terminals**:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Runs on `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```
Runs on `http://localhost:5000`

**Terminal 3 - MongoDB** (if not using Docker):
```bash
mongod
```

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd server
npm run build
npm start
```

## 📱 Using the Application

### Public Pages
- Home: `http://localhost:3000/`
- Tracks: `http://localhost:3000/tracks`
- Events: `http://localhost:3000/events`
- Stories: `http://localhost:3000/stories`
- About: `http://localhost:3000/about`

### Admin Access
1. Go to `http://localhost:3000/login`
2. Login with admin credentials
3. Access admin dashboard at `http://localhost:3000/admin`

### Admin Dashboard Features
- **Dashboard Overview** - Statistics and quick actions
- **Events Management** - Create, edit, delete events
- **Blog Posts Management** - Create, edit, delete blog posts with rich text editor
- **Real-time Updates** - Changes persist to database

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/login      - Login user
POST   /api/auth/register   - Register new user
GET    /api/auth/me         - Get current user (protected)
```

### Events
```
GET    /api/events          - Get all events (public)
GET    /api/events/:id      - Get event by ID (public)
POST   /api/events          - Create event (admin only)
PUT    /api/events/:id      - Update event (admin only)
DELETE /api/events/:id      - Delete event (admin only)
```

### Blog Posts
```
GET    /api/blog-posts      - Get all blog posts (public)
GET    /api/blog-posts/:id  - Get blog post by ID (public)
POST   /api/blog-posts      - Create blog post (admin only)
PUT    /api/blog-posts/:id  - Update blog post (admin only)
DELETE /api/blog-posts/:id  - Delete blog post (admin only)
```

## 📚 Documentation

- [Backend Setup Guide](./docs/backend-setup.md)
- [API Documentation](./server/README.md)
- [Frontend Architecture](./CLAUDE.md)

## 🧪 Testing

**Frontend:**
```bash
npm run test
npm run test:coverage
```

**Backend:**
```bash
cd server
npm run test
```

## 🔍 Code Quality

**Linting:**
```bash
npm run lint
npm run lint:fix
```

**Type Checking:**
```bash
npm run typecheck
```

**Formatting:**
```bash
npm run format
npm run format:fix
```

**All Checks:**
```bash
npm run check
```

## 🏗️ Tech Stack

### Frontend
- React 18.3.1
- TypeScript 5.8.3
- Material-UI 7.3.1
- React Router 7.8.1
- React Query 5.85.5
- React Hook Form 7.62.0
- Zod 4.0.17
- Vite 7.1.2

### Backend
- Node.js 18+
- Express 5.0.1
- MongoDB 6.x
- Mongoose 8.8.4
- JWT (jsonwebtoken 9.0.2)
- Bcrypt 5.1.1
- Zod 4.0.17
- Pino 9.6.0

## 📂 Project Structure

```
techlabs-mvp/
├── src/                      # Frontend source
│   ├── components/          # Shared components
│   ├── features/            # Feature modules
│   │   ├── admin/          # Admin dashboard
│   │   ├── auth/           # Authentication
│   │   ├── events/         # Events pages
│   │   ├── home/           # Home page
│   │   └── ...
│   ├── config/             # App configuration
│   ├── lib/                # Utilities and API client
│   └── theme/              # MUI theme
├── server/                  # Backend source
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── config/         # Server configuration
│   │   └── lib/            # Utilities
│   └── package.json
├── docs/                    # Documentation
└── package.json
```

## 🔐 Security

- JWT-based authentication
- Bcrypt password hashing
- Request validation with Zod
- CORS protection
- Helmet for HTTP headers security
- Role-based authorization
- Input sanitization

## 🚢 Deployment

### Frontend (Firebase Hosting)
```bash
npm run build
firebase deploy
```

### Backend (Node.js Server)
- Use PM2 for process management
- Set up reverse proxy (Nginx)
- Enable HTTPS with SSL certificates
- Use environment variables for secrets
- Set up MongoDB Atlas for database

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod           # Linux
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Kill process on port 5000
lsof -ti:5000 | xargs kill
```

### CORS Error
- Ensure `CORS_ORIGIN` in backend `.env` matches frontend URL
- Default is `http://localhost:3000`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📝 License

MIT

## 👥 Authors

TechLabs Team
