# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Auth Endpoints

### 1. Sign Up (Register)
**POST** `/api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

## Products Endpoints

### 1. Get All Products
**GET** `/api/products`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "product_id",
      "name": "Products Name",
      "description": "Products description",
      "price": 99.99,
      "category": "Electronics",
      "stock": 50,
      "imageUrl": "https://example.com/image.jpg",
      "createdBy": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Products
**GET** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "Products Name",
    "description": "Products description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "imageUrl": "https://example.com/image.jpg",
    "createdBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 3. Create Products (Protected)
**POST** `/api/products`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "New Products",
  "description": "Products description",
  "price": 99.99,
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Products created successfully",
  "data": {
    "_id": "product_id",
    "name": "New Products",
    "description": "Products description",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "imageUrl": "https://example.com/image.jpg",
    "createdBy": "user_id"
  }
}
```

### 4. Update Products (Protected)
**PUT** `/api/products/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Products Name",
  "price": 149.99,
  "stock": 75
}
```

**Response:**
```json
{
  "success": true,
  "message": "Products updated successfully",
  "data": {
    "_id": "product_id",
    "name": "Updated Products Name",
    "price": 149.99,
    "stock": 75
  }
}
```

### 5. Delete Products (Protected)
**DELETE** `/api/products/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Products deleted successfully",
  "data": {}
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error
```

