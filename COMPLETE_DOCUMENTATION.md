# Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Backend Documentation](#backend-documentation)
4. [Frontend Documentation](#frontend-documentation)
5. [API Documentation](#api-documentation)
6. [Setup Guide](#setup-guide)
7. [Testing Guide](#testing-guide)
8. [Deployment Guide](#deployment-guide)

---

## Project Overview

### What is This Project?

This is a **full-stack MEAN application** (MongoDB, Express, Angular, Node.js) with:
- **Backend**: RESTful API server with authentication and product management
- **Frontend**: Angular application with modern reactive patterns
- **Database**: MongoDB for data persistence
- **Authentication**: JWT (JSON Web Token) based authentication

### Key Features

#### Backend Features
- ✅ User authentication (signup/login)
- ✅ JWT token-based authorization
- ✅ Password hashing with bcrypt
- ✅ Products CRUD operations
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware
- ✅ RESTful API design
- ✅ Error handling

#### Frontend Features
- ✅ Angular 21 with standalone components
- ✅ Reactive state management with signals
- ✅ HTTP client integration
- ✅ Authentication service
- ✅ Products service
- ✅ Type-safe models
- ✅ Modern UI with Tailwind CSS

---

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│                   Angular Application                        │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS
                       │ (REST API Calls)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Backend Server                             │
│                   Node.js + Express                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes Layer                                        │   │
│  │  - /api/auth/*  (Authentication)                     │   │
│  │  - /api/products/*  (Products)                       │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐   │
│  │  Middleware Layer                                    │   │
│  │  - JWT Verification                                  │   │
│  │  - Role Authorization                                │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐   │
│  │  Controllers Layer                                   │   │
│  │  - Auth Controller (signup, login, getMe)            │   │
│  │  - Products Controller (CRUD operations)              │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐   │
│  │  Models Layer (Mongoose)                             │   │
│  │  - User Model                                        │   │
│  │  - Products Model                                     │   │
│  └────────────┬─────────────────────────────────────────┘   │
└───────────────┼──────────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Database                           │
│  Collections:                                                │
│  - users                                                     │
│  - products                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend:**
- Node.js (Runtime)
- Express.js (Web Framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password Hashing)
- dotenv (Environment Variables)
- CORS (Cross-Origin Resource Sharing)

**Frontend:**
- Angular 21 (Framework)
- TypeScript (Language)
- RxJS (Reactive Programming)
- Signals (State Management)
- Tailwind CSS (Styling)
- HttpClient (HTTP Communication)

---

## Backend Documentation

### Project Structure

```
server/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controllers/
│   ├── authController.js        # Authentication logic
│   └── productController.js     # Products CRUD logic
├── middleware/
│   └── auth.js                  # JWT verification & authorization
├── models/
│   ├── User.js                  # User schema & methods
│   └── Products.js               # Products schema
├── routes/
│   ├── authRoutes.js            # Authentication endpoints
│   └── productRoutes.js         # Products endpoints
├── server.js                    # Main server entry point
├── API_DOCUMENTATION.md         # API reference
└── SETUP_GUIDE.md              # Setup instructions
```

### Database Models

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: now)
}
```

**Methods:**
- `signup(data)` - Register new user
- `login(data)` - Login user
- `getMe()` - Get current user profile
- `logout()` - Logout and clear session
- `getToken()` - Get JWT token from storage
- `isLoggedIn()` - Check authentication status

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Header
For protected routes, include JWT token:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### 1. Authentication Endpoints

##### POST /api/auth/signup
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // optional, defaults to "user"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- 400: User already exists
- 500: Server error

##### POST /api/auth/login
Login existing user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Responses:**
- 400: Missing email or password
- 401: Invalid credentials
- 500: Server error

##### GET /api/auth/me
Get current user profile (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Error Responses:**
- 401: Not authorized
- 500: Server error

#### 2. Products Endpoints

##### GET /api/products
Get all products (Public)

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Laptop",
      "description": "High-performance laptop",
      "price": 999.99,
      "category": "Electronics",
      "stock": 10,
      "imageUrl": "https://example.com/laptop.jpg",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

##### GET /api/products/:id
Get single product (Public)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 10,
    "imageUrl": "https://example.com/laptop.jpg",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Responses:**
- 404: Products not found
- 500: Server error

##### POST /api/products
Create new product (Protected)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "category": "Electronics",
  "stock": 10,
  "imageUrl": "https://example.com/laptop.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Products created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 10,
    "imageUrl": "https://example.com/laptop.jpg",
    "createdBy": "507f1f77bcf86cd799439012"
  }
}
```

**Error Responses:**
- 401: Not authorized
- 500: Server error

##### PUT /api/products/:id
Update product (Protected - Owner or Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Updated Laptop",
  "price": 1299.99,
  "stock": 15
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Laptop",
    "price": 1299.99,
    "stock": 15
  }
}
```

**Error Responses:**
- 401: Not authorized
- 403: Not authorized to update this product
- 404: Products not found
- 500: Server error

##### DELETE /api/products/:id
Delete product (Protected - Owner or Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Products deleted successfully",
  "data": {}
}
```

**Error Responses:**
- 401: Not authorized
- 403: Not authorized to delete this product
- 404: Products not found
- 500: Server error

---

## Setup Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

### Installation Steps

#### Step 1: Clone or Navigate to Project
```bash
cd /home/oem/Desktop/angular/ngrx-store
```

#### Step 2: Install Dependencies
```bash
# Install all dependencies (backend + frontend)
npm install
```

#### Step 3: Configure Environment Variables

Create/Edit `.env` file in the root directory:
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/ngrx-store

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=30d
```

**Important:** Change `JWT_SECRET` to a strong random string in production!

#### Step 4: Start MongoDB

**Option A: Using systemd (Linux)**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Start on boot
sudo systemctl status mongod  # Check status
```

**Option B: Using Docker**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:latest
```

**Option C: MongoDB Atlas (Cloud)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

#### Step 5: Start the Backend Server

**Development mode (with auto-restart):**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server
```

Server will start at: `http://localhost:5000`

#### Step 6: Start the Angular Frontend

In a new terminal:
```bash
npm start
```

Frontend will start at: `http://localhost:4200`

### Verify Installation

1. **Check Backend:**
   - Open browser: `http://localhost:5000`
   - You should see API endpoints list

2. **Check Frontend:**
   - Open browser: `http://localhost:4200`
   - You should see the Angular app

3. **Check MongoDB:**
   ```bash
   mongosh
   # In mongosh:
   show dbs
   use ngrx-store
   show collections
   ```

---

## Testing Guide

### Manual Testing with cURL

#### 1. Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### 2. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response!

#### 3. Test Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### 4. Test Create Products
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Products",
    "description": "A test product",
    "price": 99.99,
    "category": "Electronics",
    "stock": 10,
    "imageUrl": "https://example.com/image.jpg"
  }'
```

#### 5. Test Get All Products
```bash
curl -X GET http://localhost:5000/api/products
```

#### 6. Test Update Products
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Updated Products",
    "price": 149.99
  }'
```

#### 7. Test Delete Products
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Automated Testing Script

Run the provided test script:
```bash
chmod +x server/test-api.sh
./server/test-api.sh
```

### Testing with Postman

1. **Import Collection:**
   - Create new collection in Postman
   - Add requests for each endpoint

2. **Set Environment Variables:**
   - `baseUrl`: `http://localhost:5000`
   - `token`: (will be set after login)

3. **Test Flow:**
   - Signup → Login → Save token → Test protected routes

---

## Deployment Guide

### Backend Deployment

#### Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-app-name
```

4. **Set Environment Variables**
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret_key
heroku config:set JWT_EXPIRE=30d
```

5. **Create Procfile**
```
web: node server/server.js
```

6. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Deploy to DigitalOcean/AWS/VPS

1. **SSH into server**
2. **Install Node.js and MongoDB**
3. **Clone repository**
4. **Install dependencies**: `npm install --production`
5. **Set environment variables**
6. **Use PM2 for process management**:
```bash
npm install -g pm2
pm2 start server/server.js --name api
pm2 startup
pm2 save
```

### Frontend Deployment

#### Deploy to Netlify/Vercel

1. **Build the app**
```bash
npm run build
```

2. **Deploy dist folder**
```bash
# For Netlify
netlify deploy --prod --dir=dist/ngrx-store/browser

# For Vercel
vercel --prod
```

#### Update API URL

Before deploying, update the API URL in Angular services:
```typescript
// In auth.service.ts and product.service.ts
private apiUrl = 'https://your-backend-url.com/api';
```

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| NODE_ENV | Environment mode | development/production | No |
| PORT | Server port | 5000 | No |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/ngrx-store | Yes |
| JWT_SECRET | Secret key for JWT | your_secret_key | Yes |
| JWT_EXPIRE | Token expiration time | 30d | No |

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Start MongoDB: `sudo systemctl start mongod`
- Check connection string in `.env`

#### 2. JWT Token Error
**Error:** `Not authorized to access this route`

**Solution:**
- Ensure token is included in Authorization header
- Format: `Authorization: Bearer <token>`
- Check if token has expired

#### 3. CORS Error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Backend already has CORS enabled
- Ensure frontend is making requests to correct URL
- Check if server is running

#### 4. Port Already in Use
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000
# Kill the process
kill -9 <PID>
# Or change PORT in .env
```

#### 5. Module Not Found
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## Best Practices

### Security
1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use strong JWT secrets** - Random, long strings
3. **Hash passwords** - Already implemented with bcrypt
4. **Validate input** - Add validation middleware
5. **Use HTTPS in production** - SSL/TLS certificates
6. **Rate limiting** - Prevent brute force attacks
7. **Sanitize user input** - Prevent injection attacks

### Code Quality
1. **Follow consistent naming** - camelCase for variables
2. **Add error handling** - Try-catch blocks
3. **Write comments** - Explain complex logic
4. **Use TypeScript** - Type safety
5. **Modular code** - Separate concerns

### Performance
1. **Use indexes** - MongoDB indexes for queries
2. **Pagination** - For large datasets
3. **Caching** - Redis for frequently accessed data
4. **Compression** - Gzip responses
5. **CDN** - For static assets

---

## Additional Resources

### Documentation Links
- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Angular Docs](https://angular.dev/)
- [JWT.io](https://jwt.io/)

### Tutorials
- [REST API Best Practices](https://restfulapi.net/)
- [MongoDB University](https://university.mongodb.com/)
- [Angular Tutorial](https://angular.dev/tutorials)

---

## Support & Contact

For issues or questions:
1. Check this documentation
2. Review error logs
3. Check MongoDB logs: `/var/log/mongodb/mongod.log`
4. Check server logs in terminal

---

## License

This project is for educational purposes.

---

## Changelog

### Version 1.0.0 (2024-12-21)
- ✅ Initial release
- ✅ Backend API with authentication
- ✅ Products CRUD operations
- ✅ MongoDB integration
- ✅ JWT authentication
- ✅ Angular frontend setup
- ✅ Complete documentation

---

**Last Updated:** December 21, 2024
- `comparePassword(candidatePassword)` - Compare plain password with hashed

**Hooks:**
- Pre-save: Hash password before saving

#### Products Model
```javascript
{
  name: String (required),
  description: String (required),
  price: Number (required, min: 0),
  category: String (required),
  stock: Number (required, min: 0, default: 0),
  imageUrl: String (default: ''),
  createdBy: ObjectId (ref: 'User', required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

**Hooks:**
- Pre-save: Update `updatedAt` timestamp

### Middleware

#### Authentication Middleware (`protect`)
- Verifies JWT token from Authorization header
- Attaches user to request object
- Returns 401 if token is invalid/missing

#### Authorization Middleware (`authorize`)
- Checks if user has required role
- Returns 403 if user doesn't have permission

### Controllers

#### Auth Controller

**signup(req, res)**
- Creates new user account
- Hashes password
- Generates JWT token
- Returns user data and token

**login(req, res)**
- Validates credentials
- Compares password
- Generates JWT token
- Returns user data and token

**getMe(req, res)**
- Returns current user profile
- Requires authentication

#### Products Controller

**getProducts(req, res)**
- Returns all products
- Public access
- Populates creator info

**getProduct(req, res)**
- Returns single product by ID
- Public access

**createProduct(req, res)**
- Creates new product
- Requires authentication
- Auto-assigns creator

**updateProduct(req, res)**
- Updates existing product
- Requires authentication
- Only owner or admin can update

**deleteProduct(req, res)**
- Deletes product
- Requires authentication
- Only owner or admin can delete

---

## Frontend Documentation

### Project Structure

```
src/app/
├── core/
│   ├── components/          # Shared core components
│   ├── guards/              # Route guards
│   ├── models/              # TypeScript interfaces
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   └── services/            # Core services
│       └── auth.service.ts
├── pages/
│   ├── cart/               # Shopping cart page
│   ├── login/              # Login page
│   ├── products/           # Products listing
│   ├── profile/            # User profile
│   └── register/           # Registration page
├── shared/                 # Shared components/utilities
├── app.config.ts          # App configuration
├── app.routes.ts          # Route definitions
└── app.ts                 # Root component
```

### Models

#### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
```

#### Products Model
```typescript
interface Products {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
  createdBy: User | string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Services

#### Auth Service

**Properties:**
- `currentUser: Signal<User | null>` - Current logged-in user
- `isAuthenticated: Signal<boolean>` - Authentication status

**Methods:**

