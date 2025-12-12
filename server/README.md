# TechLabs Backend API

Backend API for the TechLabs MVP application built with Node.js, Express, MongoDB, and TypeScript.

## Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure access
- **Role-based Authorization** (admin, user)
- **Request Validation** with Zod
- **Structured Logging** with Pino
- **Error Handling** with custom error middleware
- **TypeScript** for type safety
- **Security** with Helmet and CORS

## Prerequisites

- Node.js >= 18.x
- MongoDB >= 6.x
- npm or yarn

## Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Create environment file**:
```bash
cp .env.example .env
```

3. **Configure environment variables** in `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techlabs
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

4. **Start MongoDB** (if running locally):
```bash
mongod
```

5. **Run development server**:
```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events

- `GET /api/events` - Get all events (public)
- `GET /api/events/:id` - Get event by ID (public)
- `POST /api/events` - Create event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Blog Posts

- `GET /api/blog-posts` - Get all blog posts (public)
- `GET /api/blog-posts/:id` - Get blog post by ID (public)
- `POST /api/blog-posts` - Create blog post (admin only)
- `PUT /api/blog-posts/:id` - Update blog post (admin only)
- `DELETE /api/blog-posts/:id` - Delete blog post (admin only)

### Health Check

- `GET /api/health` - Server health check

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register or login to get a token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer <your-token>
   ```

## Response Format

### Success Response
```json
{
  "data": {
    // Response data
  }
}
```

### Paginated Response
```json
{
  "data": [
    // Array of items
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {},
    "traceId": "trace-id"
  }
}
```

## Database Models

### User
- email (unique, required)
- password (hashed, required)
- role (admin/user)
- firstName
- lastName
- isActive
- timestamps

### Event
- title (required)
- slug (unique, required)
- type (enum, required)
- date (required)
- location (required)
- blurb (required)
- description
- imageUrl
- registrationUrl
- capacity
- registeredCount
- isPublished
- timestamps

### BlogPost
- title (required)
- slug (unique, required)
- excerpt (required)
- content (required)
- featuredImage
- author
- tags (array)
- status (draft/published/archived)
- publishedAt
- timestamps

## Security

- **Helmet** for HTTP headers security
- **CORS** protection with whitelist
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Input validation** with Zod
- **Error redaction** in logs
- **Rate limiting** (recommended for production)

## Logging

The API uses Pino for structured logging with the following levels:
- `trace` - Development debugging
- `debug` - Detailed debugging
- `info` - General information
- `warn` - Warning messages
- `error` - Error messages

Logs include:
- Request/response details
- Latency measurements
- Error stack traces (development only)
- PII redaction (passwords, tokens, emails)

## Development Guidelines

1. **No classes** - Use functional programming style
2. **TypeScript strict mode** - No `any` types
3. **Validation** - All inputs must be validated with Zod
4. **Error handling** - Use try-catch and error middleware
5. **Logging** - Use structured logging with Pino
6. **File size** - Keep files ≤220 lines

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables

3. Start the server:
```bash
NODE_ENV=production npm start
```

4. Use a process manager (PM2, systemd)

5. Set up reverse proxy (Nginx, Apache)

6. Enable HTTPS with SSL certificates

7. Set up monitoring and logging

## License

MIT
