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
- ✅ Product CRUD operations
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware
- ✅ RESTful API design
- ✅ Error handling

#### Frontend Features
- ✅ Angular 21 with standalone components
- ✅ Reactive state management with signals
- ✅ HTTP client integration
- ✅ Authentication service
- ✅ Product service
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
│  │  - Product Controller (CRUD operations)              │   │
│  └────────────┬─────────────────────────────────────────┘   │
│               │                                              │
│  ┌────────────▼─────────────────────────────────────────┐   │
│  │  Models Layer (Mongoose)                             │   │
│  │  - User Model                                        │   │
│  │  - Product Model                                     │   │
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
│   └── productController.js     # Product CRUD logic
├── middleware/
│   └── auth.js                  # JWT verification & authorization
├── models/
│   ├── User.js                  # User schema & methods
│   └── Product.js               # Product schema
├── routes/
│   ├── authRoutes.js            # Authentication endpoints
│   └── productRoutes.js         # Product endpoints
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
- `comparePassword(candidatePassword)` - Compare plain password with hashed

**Hooks:**
- Pre-save: Hash password before saving

#### Product Model
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

#### Product Controller

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

#### Product Model
```typescript
interface Product {
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

