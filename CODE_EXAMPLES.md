# Code Examples & Usage Guide

## Table of Contents
1. [Backend Examples](#backend-examples)
2. [Frontend Examples](#frontend-examples)
3. [API Usage Examples](#api-usage-examples)
4. [Common Patterns](#common-patterns)

---

## Backend Examples

### 1. Creating a New Controller

```javascript
// server/controllers/exampleController.js
const ExampleModel = require('../models/Example');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await ExampleModel.find();
    
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    const item = await ExampleModel.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### 2. Creating a New Model

```javascript
// server/models/Example.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add custom method
exampleSchema.methods.activate = function() {
  this.status = 'active';
  return this.save();
};

// Add static method
exampleSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

module.exports = mongoose.model('Example', exampleSchema);
```

### 3. Creating Protected Routes

```javascript
// server/routes/exampleRoutes.js
const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/exampleController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.get('/', getItems);

// Protected route (requires login)
router.post('/', protect, createItem);

// Admin only route
router.delete('/:id', protect, authorize('admin'), deleteItem);

module.exports = router;
```

### 4. Custom Middleware

```javascript
// server/middleware/validation.js
exports.validateProduct = (req, res, next) => {
  const { name, price, stock } = req.body;
  
  if (!name || !price || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, price, and stock'
    });
  }
  
  if (price < 0) {
    return res.status(400).json({
      success: false,
      message: 'Price cannot be negative'
    });
  }
  
  next();
};
```

---

## Frontend Examples

### 1. Creating a Service

```typescript
// src/app/core/services/product.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/products';
  
  // Reactive state
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  
  /**
   * Get all products
   */
  getProducts(): Observable<ProductResponse> {
    this.loading.set(true);
    return this.http.get<ProductResponse>(this.apiUrl);
  }
  
  /**
   * Get single product
   */
  getProduct(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }
  
  /**
   * Create product
   */
  createProduct(data: any): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.apiUrl, data);
  }
  
  /**
   * Update product
   */
  updateProduct(id: string, data: any): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`${this.apiUrl}/${id}`, data);
  }
  
  /**
   * Delete product
   */
  deleteProduct(id: string): Observable<ProductResponse> {
    return this.http.delete<ProductResponse>(`${this.apiUrl}/${id}`);
  }
}
```

### 2. Creating a Component

```typescript
// src/app/pages/products/products.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="products-container">
      <h1>Products</h1>
      
      @if (loading()) {
        <p>Loading...</p>
      }
      
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      
      <div class="products-grid">
        @for (product of products(); track product._id) {
          <div class="product-card">
            <img [src]="product.imageUrl" [alt]="product.name">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p class="price">\${{ product.price }}</p>
            <button (click)="addToCart(product)">Add to Cart</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .product-card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2563eb;
    }
  `]
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductService);
  
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  
  ngOnInit() {
    this.loadProducts();
  }
  
  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products.set(response.data as Product[]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }
  
  addToCart(product: Product) {
    console.log('Adding to cart:', product);
    // Implement cart logic
  }
}
```

### 3. Creating an Auth Guard

```typescript
// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};
```

### 4. HTTP Interceptor for Auth Token

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};
```

---

## API Usage Examples

### 1. User Registration Flow

```javascript
// Frontend - Registration Component
async onSignup(formData) {
  this.authService.signup(formData).subscribe({
    next: (response) => {
      console.log('Signup successful:', response);
      // Token is automatically stored
      this.router.navigate(['/products']);
    },
    error: (error) => {
      console.error('Signup failed:', error);
      this.errorMessage = error.error.message;
    }
  });
}
```

```bash
# cURL Example
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### 2. Login and Store Token

```typescript
// Frontend - Login Component
onLogin(credentials: LoginRequest) {
  this.authService.login(credentials).subscribe({
    next: (response) => {
      // Token automatically stored in localStorage
      console.log('Logged in as:', response.data.user.name);
      this.router.navigate(['/dashboard']);
    },
    error: (error) => {
      this.errorMessage = 'Invalid credentials';
    }
  });
}
```

### 3. Making Authenticated Requests

```typescript
// Frontend - Product Creation
createProduct(productData: CreateProductRequest) {
  // Token automatically added by interceptor
  this.productService.createProduct(productData).subscribe({
    next: (response) => {
      console.log('Product created:', response.data);
      this.loadProducts(); // Refresh list
    },
    error: (error) => {
      console.error('Failed to create product:', error);
    }
  });
}
```

```bash
# cURL Example with Token
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Gaming Laptop",
    "description": "High-performance gaming laptop",
    "price": 1299.99,
    "category": "Electronics",
    "stock": 5,
    "imageUrl": "https://example.com/laptop.jpg"
  }'
```

---

## Common Patterns

### 1. Error Handling Pattern

```typescript
// Service with error handling
getProducts(): Observable<Product[]> {
  return this.http.get<ProductResponse>(this.apiUrl).pipe(
    map(response => response.data as Product[]),
    catchError(error => {
      console.error('Error fetching products:', error);
      return throwError(() => new Error('Failed to fetch products'));
    })
  );
}

// Component usage
loadProducts() {
  this.productService.getProducts().subscribe({
    next: (products) => this.products.set(products),
    error: (error) => this.error.set(error.message)
  });
}
```

### 2. Loading State Pattern

```typescript
// Component with loading state
loadData() {
  this.loading.set(true);
  this.error.set('');
  
  this.dataService.getData().subscribe({
    next: (data) => {
      this.data.set(data);
      this.loading.set(false);
    },
    error: (error) => {
      this.error.set(error.message);
      this.loading.set(false);
    }
  });
}
```

### 3. Form Validation Pattern

```typescript
// Reactive form with validation
import { FormBuilder, Validators } from '@angular/forms';

export class LoginComponent {
  private fb = inject(FormBuilder);
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => this.errorMessage = err.message
      });
    }
  }
}
```

### 4. Pagination Pattern

```javascript
// Backend - Pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');
    
    const total = await Product.countDocuments();
    
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

**Last Updated:** December 21, 2024

