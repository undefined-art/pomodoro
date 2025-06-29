## 📦 Installation

### Prerequisites

- Node.js 18+
- Docker and Docker Compose (for production)
- PostgreSQL (for production)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pomodoro
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**

   ```bash
   # Server environment
   cd server
   cp env.example .env
   # Edit .env with your configuration

   # Client environment
   cd ../client
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**

   ```bash
   cd server
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start Development Servers**

   ```bash
   # Start backend (from server directory)
   npm run start:dev

   # Start frontend (from client directory)
   npm run dev
   ```

### Production Deployment

1. **Using Docker Compose (Recommended)**

   ```bash
   # Build and start all services
   docker-compose up -d

   # View logs
   docker-compose logs -f

   # Stop services
   docker-compose down
   ```

2. **Manual Deployment**

   ```bash
   # Build frontend
   cd client
   npm run build

   # Build backend
   cd ../server
   npm run build
   npm run start:prod
   ```

## 🔧 Configuration

### Environment Variables

#### Server (.env)

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pomodoro"

# JWT Secrets (generate strong secrets for production)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Session
SESSION_SECRET=your_session_secret_here

# CORS
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

#### Client (.env)

```env
# API Configuration
VITE_API_URL=https://yourdomain.com/api/v1

# App Configuration
VITE_APP_NAME=Tempo
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

## 🚀 API Endpoints

### Authentication

- `POST /api/v1/auth/local/login` - User login
- `POST /api/v1/auth/local/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - User logout

### Tasks

- `GET /api/v1/tasks` - Get all tasks
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:id` - Get task by ID
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Projects

- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:id` - Get project by ID
- `PATCH /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Comprehensive request validation
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: XSS protection, content type validation
- **SQL Injection Protection**: Prisma ORM with parameterized queries

## 📊 Database Schema

### Users

- `id`: Primary key
- `username`: Unique username
- `email`: Unique email address
- `hash`: Hashed password
- `refreshToken`: JWT refresh token
- `createdAt`, `updatedAt`: Timestamps

### Projects

- `id`: Primary key
- `title`: Project name
- `createdBy`: User ID
- `createdAt`, `updatedAt`: Timestamps

### Tasks

- `id`: Primary key
- `title`: Task name
- `completed`: Completion status
- `projectId`: Associated project
- `pomodoro`: Estimated pomodoro sessions
- `sessions`: Completed sessions
- `draft`: Draft status
- `createdBy`: User ID
- `createdAt`, `updatedAt`, `expiredAt`: Timestamps

## 🧪 Testing

```bash
# Backend tests
cd server
npm run test
npm run test:e2e

# Frontend tests (when implemented)
cd client
npm run test
```

Built with ❤️ using modern web technologies
