# NGRX Store - Full Stack MEAN Application

A complete full-stack application built with **MongoDB, Express.js, Angular, and Node.js** featuring authentication, product management, and modern reactive patterns.

---

## 🚀 Quick Start

### Start the Application

```bash
# 1. Start MongoDB
sudo systemctl start mongod

# 2. Start Backend Server
npm run server:dev

# 3. Start Frontend (in new terminal)
npm start
```

✅ **Backend:** http://localhost:5000  
✅ **Frontend:** http://localhost:4200

---

## 📚 Documentation

### 📖 Main Documentation Files

| Document | Description | Link |
|----------|-------------|------|
| **Complete Documentation** | Full comprehensive guide covering everything | [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md) |
| **Quick Start Guide** | Get started in 5 minutes | [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) |
| **File Structure** | Detailed project structure explanation | [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) |
| **Code Examples** | Usage examples and patterns | [CODE_EXAMPLES.md](./CODE_EXAMPLES.md) |
| **API Documentation** | API endpoints reference | [server/API_DOCUMENTATION.md](./server/API_DOCUMENTATION.md) |
| **Setup Guide** | Detailed setup instructions | [server/SETUP_GUIDE.md](./server/SETUP_GUIDE.md) |
| **MongoDB Install** | MongoDB installation guide | [MONGODB_INSTALL.md](./MONGODB_INSTALL.md) |

---

## ✨ Features

### Backend Features
- ✅ RESTful API with Express.js
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB database with Mongoose ODM
- ✅ Product CRUD operations
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware
- ✅ CORS enabled
- ✅ Environment variable configuration

### Frontend Features
- ✅ Angular 21 with standalone components
- ✅ Reactive state management with signals
- ✅ TypeScript for type safety
- ✅ HTTP client integration
- ✅ Authentication service
- ✅ Product service
- ✅ Route guards
- ✅ Modern UI with Tailwind CSS

---

## 🏗️ Architecture

```
┌─────────────────┐
│  Angular App    │  ← Frontend (Port 4200)
│  (TypeScript)   │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express API    │  ← Backend (Port 5000)
│  (Node.js)      │
└────────┬────────┘
         │ Mongoose
         ▼
┌─────────────────┐
│    MongoDB      │  ← Database (Port 27017)
└─────────────────┘
```

---

## 📂 Project Structure

```
ngrx-store/
├── server/                 # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── server.js          # Entry point
├── src/                   # Frontend (Angular)
│   └── app/
│       ├── core/          # Services, models, guards
│       ├── pages/         # Page components
│       └── shared/        # Shared components
├── .env                   # Environment variables
└── Documentation files    # All .md files
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

### Frontend
- **Angular 21** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Signals** - State management
- **Tailwind CSS** - Styling
- **HttpClient** - HTTP communication

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm (v6+)

### Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**

