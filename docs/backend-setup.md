# Backend Setup Guide

This guide explains how to set up and run the TechLabs backend API.

## Overview

The backend has been migrated from Firebase to a full Node.js/Express/MongoDB stack with:
- JWT-based authentication (replacing Firebase Auth)
- RESTful API with validation
- MongoDB for data persistence
- Structured logging with Pino
- Type-safe TypeScript implementation

## Prerequisites

1. **Node.js** >= 18.x
2. **MongoDB** >= 6.x
3. **npm** or **yarn**

## Quick Start

### 1. Install MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

**Ubuntu/Debian:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

**Docker (recommended for development):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# Make sure to set a strong JWT_SECRET (minimum 32 characters)
```

### 3. Environment Configuration

Edit `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlabs
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-minimum-32-chars
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### 4. Start Backend Server

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm run build
npm start
```

The API will be available at `http://localhost:5000/api`

### 5. Frontend Configuration

Update `/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 6. Create Admin User

Currently, you need to create an admin user directly in MongoDB:

```bash
# Connect to MongoDB
mongosh techlabs

# Create admin user
db.users.insertOne({
  email: "admin@techlabs.com",
  password: "$2b$10$YourHashedPasswordHere",  // Use bcrypt to hash
  role: "admin",
  firstName: "Admin",
  lastName: "User",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use this Node.js script to create an admin:

```javascript
// scripts/create-admin.js
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const createAdmin = async () => {
  await mongoose.connect('mongodb://localhost:27017/techlabs');
  
  const hashedPassword = await bcrypt.hash('YourPassword123!', 10);
  
  const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
    role: String,
    firstName: String,
    lastName: String,
    isActive: Boolean
  }));
  
  await User.create({
    email: 'admin@techlabs.com',
    password: hashedPassword,
    role: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    isActive: true
  });
  
  console.log('Admin user created!');
  process.exit(0);
};

createAdmin();
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user (protected)

### Events (Public GET, Admin CUD)
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Blog Posts (Public GET, Admin CUD)
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts/:id` - Get blog post by ID
- `POST /api/blog-posts` - Create blog post (admin only)
- `PUT /api/blog-posts/:id` - Update blog post (admin only)
- `DELETE /api/blog-posts/:id` - Delete blog post (admin only)

### Health Check
- `GET /api/health` - Server health status

## Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@techlabs.com","password":"YourPassword123!"}'

# Get events (public)
curl http://localhost:5000/api/events

# Create event (admin only)
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Event","slug":"test-event","type":"workshop","date":"2024-12-20T10:00:00Z","location":"Online","blurb":"Test event description"}'
```

## Running Full Stack

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

### Terminal 3 - MongoDB (if not using Docker):
```bash
mongod
```

Now you can:
1. Visit `http://localhost:3000` for the main site
2. Visit `http://localhost:3000/login` to login as admin
3. Visit `http://localhost:3000/admin` for the admin dashboard

## Database Management

### View data:
```bash
mongosh techlabs
db.events.find()
db.blogposts.find()
db.users.find()
```

### Reset database:
```bash
mongosh techlabs
db.dropDatabase()
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check connection string in `.env`

### JWT Secret Error
- Ensure JWT_SECRET is at least 32 characters
- Never use the example secret in production

### CORS Error
- Check CORS_ORIGIN in backend `.env` matches your frontend URL
- Default is `http://localhost:3000`

### Port Already in Use
- Change PORT in backend `.env`
- Update VITE_API_BASE_URL in frontend `.env`

## Production Deployment

1. Set environment to production:
   ```env
   NODE_ENV=production
   ```

2. Use strong JWT secret (generate with):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Use MongoDB Atlas or managed MongoDB

4. Enable rate limiting (add to middleware)

5. Use HTTPS and proper CORS configuration

6. Set up monitoring and logging

7. Use process manager (PM2) or containerization (Docker)

## Next Steps

- [ ] Implement rate limiting for auth endpoints
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Implement file upload for images
- [ ] Add API documentation (Swagger)
- [ ] Set up automated tests
- [ ] Configure CI/CD pipeline
