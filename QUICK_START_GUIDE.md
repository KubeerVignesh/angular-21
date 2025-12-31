# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Start MongoDB
```bash
sudo systemctl start mongod
```

### Step 2: Start Backend Server
```bash
npm run server:dev
```
✅ Server running at: http://localhost:5000

### Step 3: Start Frontend (New Terminal)
```bash
npm start
```
✅ Frontend running at: http://localhost:4200

---

## 📝 Quick Test

### Test Backend API

**1. Signup:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

**3. Create Products (use token from login):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Laptop","description":"Gaming laptop","price":999,"category":"Electronics","stock":5}'
```

**4. Get Products:**
```bash
curl http://localhost:5000/api/products
```

---

## 📂 Project Structure

```
ngrx-store/
├── server/                  # Backend
│   ├── config/             # Database config
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── server.js           # Entry point
├── src/                    # Frontend
│   └── app/
│       ├── core/           # Services, models
│       ├── pages/          # Page components
│       └── shared/         # Shared components
├── .env                    # Environment variables
├── package.json            # Dependencies
└── COMPLETE_DOCUMENTATION.md  # Full docs
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get profile (Protected)

### Products
- `GET /api/products` - Get all
- `GET /api/products/:id` - Get one
- `POST /api/products` - Create (Protected)
- `PUT /api/products/:id` - Update (Protected)
- `DELETE /api/products/:id` - Delete (Protected)

---

## 🛠️ Common Commands

### Backend
```bash
npm run server        # Start production
npm run server:dev    # Start development (auto-reload)
```

### Frontend
```bash
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

### MongoDB
```bash
sudo systemctl start mongod    # Start
sudo systemctl stop mongod     # Stop
sudo systemctl status mongod   # Check status
mongosh                        # Open shell
```

---

## 🔧 Configuration

### Environment Variables (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngrx-store
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
```

---

## 📖 Documentation Files

1. **COMPLETE_DOCUMENTATION.md** - Full comprehensive guide
2. **server/API_DOCUMENTATION.md** - API reference
3. **server/SETUP_GUIDE.md** - Detailed setup
4. **MONGODB_INSTALL.md** - MongoDB installation
5. **QUICK_START_GUIDE.md** - This file

---

## ❓ Troubleshooting

### MongoDB not connecting?
```bash
sudo systemctl start mongod
sudo systemctl status mongod
```

### Port already in use?
```bash
# Change PORT in .env file
PORT=5001
```

### Dependencies issues?
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Next Steps

1. ✅ Read COMPLETE_DOCUMENTATION.md for full details
2. ✅ Test all API endpoints
3. ✅ Integrate Angular frontend with backend
4. ✅ Add more features (password reset, email verification, etc.)
5. ✅ Deploy to production

---

## 📞 Need Help?

Check these files:
- **COMPLETE_DOCUMENTATION.md** - Everything you need
- **server/API_DOCUMENTATION.md** - API details
- **Troubleshooting section** - Common issues

---

**Happy Coding! 🚀**

