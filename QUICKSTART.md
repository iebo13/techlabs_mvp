# Quick Start Guide

Get the TechLabs full-stack application running in 5 minutes!

## Prerequisites

- Node.js >= 18.x
- Docker (for MongoDB)

## Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone <repo-url>
cd techlabs-mvp

# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 2. Start MongoDB

```bash
docker run -d -p 27017:27017 --name mongodb mongo:6
```

### 3. Configure Environment

```bash
# Frontend
cp .env.example .env

# Backend
cp server/.env.example server/.env
```

Edit `server/.env` and set a strong JWT_SECRET (minimum 32 characters):
```bash
# Generate a secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Create Admin User

```bash
cd server
npm run create-admin
# Follow prompts to create admin account
cd ..
```

### 5. Start the Application

Open 2 terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin

## Test It

1. Visit http://localhost:3000
2. Browse the public pages
3. Go to http://localhost:3000/login
4. Login with your admin credentials
5. Access the admin dashboard
6. Try creating an event or blog post!

## Troubleshooting

### MongoDB Connection Error
```bash
# Check if container is running
docker ps

# Start MongoDB if stopped
docker start mongodb
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Kill process on port 5000
lsof -ti:5000 | xargs kill
```

### JWT Secret Error
Make sure JWT_SECRET in `server/.env` is at least 32 characters.

## Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [MIGRATION.md](./MIGRATION.md) for Firebase migration details
- See [docs/backend-setup.md](./docs/backend-setup.md) for backend details

## Need Help?

Check the troubleshooting section in [README.md](./README.md) or the backend setup guide.
