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
- ✅ Products CRUD operations
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
- ✅ Products service
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
```bash
# Edit .env file
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngrx-store
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

3. **Start MongoDB**
```bash
sudo systemctl start mongod
```

4. **Start Backend**
```bash
npm run server:dev
```

5. **Start Frontend**
```bash
npm start
```

---

## 🧪 Testing

### Test Backend API

```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Get Products
curl http://localhost:5000/api/products
```

### Automated Testing
```bash
chmod +x server/test-api.sh
./server/test-api.sh
```

---

## 📖 Usage Examples

### Register a User
```typescript
// Frontend
this.authService.signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
}).subscribe(response => {
  console.log('User registered:', response);
});
```

### Create a Products
```typescript
// Frontend (requires authentication)
this.productService.createProduct({
  name: 'Laptop',
  description: 'Gaming laptop',
  price: 999.99,
  category: 'Electronics',
  stock: 10
}).subscribe(response => {
  console.log('Products created:', response);
});
```

---

## 🔒 Security

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens for stateless authentication
- ✅ Protected routes with middleware
- ✅ Role-based authorization
- ✅ CORS enabled for cross-origin requests
- ✅ Environment variables for secrets
- ✅ Input validation

---

## 🐛 Troubleshooting

### MongoDB not connecting?
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Port already in use?
```bash
# Change PORT in .env
PORT=5001
```

### Dependencies issues?
```bash
rm -rf node_modules package-lock.json
npm install
```

See [COMPLETE_DOCUMENTATION.md](./COMPLETE_DOCUMENTATION.md) for more troubleshooting.

---

## 📚 Learn More

- [Complete Documentation](./COMPLETE_DOCUMENTATION.md) - Everything you need to know
- [Quick Start Guide](./QUICK_START_GUIDE.md) - Get started quickly
- [API Documentation](./server/API_DOCUMENTATION.md) - API reference
- [Code Examples](./CODE_EXAMPLES.md) - Usage examples

---

## 🎯 Next Steps

1. ✅ Read the [Complete Documentation](./COMPLETE_DOCUMENTATION.md)
2. ✅ Follow the [Quick Start Guide](./QUICK_START_GUIDE.md)
3. ✅ Test the API endpoints
4. ✅ Explore the [Code Examples](./CODE_EXAMPLES.md)
5. ✅ Build your own features!

---

**Happy Coding! 🚀**

**Last Updated:** December 21, 2024

