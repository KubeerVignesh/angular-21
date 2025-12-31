# Backend Server Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally, or MongoDB Atlas account

## Installation Steps

### 1. Install Dependencies
Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### 2. Configure Environment Variables
A `.env` file has been created in the root directory. Update it with your settings:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/ngrx-store
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production_12345
JWT_EXPIRE=30d
```

**Important:** 
- Change `JWT_SECRET` to a strong, random string in production
- Update `MONGO_URI` if using MongoDB Atlas or a different connection string

### 3. Start MongoDB
If using local MongoDB:
```bash
# On Linux/Mac
sudo systemctl start mongod
# or
mongod

# On Windows
net start MongoDB
```

If using MongoDB Atlas, make sure your connection string is correct in `.env`

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server
```

The server will start on `http://localhost:5000`

## Testing the API

### Using cURL

**1. Sign Up:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**3. Create Product (use token from login):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics",
    "stock": 10,
    "imageUrl": "https://example.com/laptop.jpg"
  }'
```

**4. Get All Products:**
```bash
curl http://localhost:5000/api/products
```

### Using Postman or Thunder Client
1. Import the API endpoints from `API_DOCUMENTATION.md`
2. Create a new environment with `baseUrl = http://localhost:5000`
3. Test each endpoint as documented

## Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── productController.js # Product CRUD logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User schema
│   └── Product.js         # Product schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   └── productRoutes.js   # Product endpoints
├── server.js              # Main server file
├── API_DOCUMENTATION.md   # API documentation
└── SETUP_GUIDE.md         # This file
```

## Available Endpoints

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

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check your `MONGO_URI` in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### JWT Token Error
- Ensure you're sending the token in the Authorization header
- Format: `Authorization: Bearer <token>`
- Check if token has expired (default: 30 days)

### Port Already in Use
- Change the `PORT` in `.env` file
- Or kill the process using port 5000

## Next Steps
- Integrate with your Angular frontend
- Add more features (password reset, email verification, etc.)
- Deploy to production (Heroku, AWS, DigitalOcean, etc.)

