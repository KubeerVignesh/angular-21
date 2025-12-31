# Project File Structure Documentation

## Complete Directory Tree

```
ngrx-store/
│
├── 📁 server/                          # Backend Node.js/Express Server
│   │
│   ├── 📁 config/                      # Configuration files
│   │   └── 📄 db.js                    # MongoDB connection setup
│   │
│   ├── 📁 controllers/                 # Request handlers (business logic)
│   │   ├── 📄 authController.js        # Authentication logic (signup, login, getMe)
│   │   └── 📄 productController.js     # Product CRUD operations
│   │
│   ├── 📁 middleware/                  # Express middleware
│   │   └── 📄 auth.js                  # JWT verification & role authorization
│   │
│   ├── 📁 models/                      # Mongoose schemas
│   │   ├── 📄 User.js                  # User model (name, email, password, role)
│   │   └── 📄 Product.js               # Product model (name, price, stock, etc.)
│   │
│   ├── 📁 routes/                      # API route definitions
│   │   ├── 📄 authRoutes.js            # /api/auth/* routes
│   │   └── 📄 productRoutes.js         # /api/products/* routes
│   │
│   ├── 📄 server.js                    # Main server entry point
│   ├── 📄 API_DOCUMENTATION.md         # API endpoints reference
│   ├── 📄 SETUP_GUIDE.md              # Backend setup instructions
│   └── 📄 test-api.sh                 # Automated API testing script
│
├── 📁 src/                             # Angular Frontend Application
│   │
│   ├── 📁 app/                         # Main application folder
│   │   │
│   │   ├── 📁 core/                    # Core module (singleton services)
│   │   │   ├── 📁 components/          # Core shared components
│   │   │   ├── 📁 guards/              # Route guards (auth guard, etc.)
│   │   │   ├── 📁 models/              # TypeScript interfaces/types
│   │   │   │   ├── 📄 user.model.ts    # User, AuthResponse interfaces
│   │   │   │   └── 📄 product.model.ts # Product, ProductResponse interfaces
│   │   │   └── 📁 services/            # Core services
│   │   │       └── 📄 auth.service.ts  # Authentication service
│   │   │
│   │   ├── 📁 pages/                   # Feature pages/modules
│   │   │   ├── 📁 cart/                # Shopping cart page
│   │   │   ├── 📁 login/               # Login page
│   │   │   ├── 📁 products/            # Products listing page
│   │   │   ├── 📁 profile/             # User profile page
│   │   │   └── 📁 register/            # Registration page
│   │   │
│   │   ├── 📁 shared/                  # Shared components/utilities
│   │   │
│   │   ├── 📄 app.config.ts            # Application configuration
│   │   ├── 📄 app.routes.ts            # Route definitions
│   │   ├── 📄 app.ts                   # Root component
│   │   ├── 📄 app.html                 # Root template
│   │   ├── 📄 app.css                  # Root styles
│   │   └── 📄 app.spec.ts              # Root component tests
│   │
│   ├── 📄 index.html                   # Main HTML file
│   ├── 📄 main.ts                      # Application entry point
│   └── 📄 styles.css                   # Global styles
│
├── 📁 public/                          # Static assets
│   └── 📄 favicon.ico                  # Favicon
│
├── 📁 node_modules/                    # Dependencies (auto-generated)
│
├── 📄 .env                             # Environment variables (DO NOT COMMIT)
├── 📄 .env.example                     # Environment variables template
├── 📄 .gitignore                       # Git ignore rules
├── 📄 package.json                     # Project dependencies & scripts
├── 📄 package-lock.json                # Locked dependency versions
├── 📄 tsconfig.json                    # TypeScript configuration
├── 📄 tsconfig.app.json                # TypeScript config for app
├── 📄 tsconfig.spec.json               # TypeScript config for tests
├── 📄 angular.json                     # Angular CLI configuration
├── 📄 README.md                        # Project README
│
├── 📄 COMPLETE_DOCUMENTATION.md        # 📚 FULL COMPREHENSIVE GUIDE
├── 📄 QUICK_START_GUIDE.md            # 🚀 Quick start instructions
├── 📄 FILE_STRUCTURE.md               # 📂 This file
└── 📄 MONGODB_INSTALL.md              # 🗄️ MongoDB installation guide
```

---

## File Descriptions

### Backend Files

#### `/server/config/db.js`
**Purpose:** MongoDB database connection configuration
**Key Functions:**
- `connectDB()` - Establishes connection to MongoDB
- Error handling for connection failures
- Logs connection status

#### `/server/controllers/authController.js`
**Purpose:** Authentication business logic
**Exports:**
- `signup(req, res)` - User registration
- `login(req, res)` - User login
- `getMe(req, res)` - Get current user profile

**Features:**
- Password hashing with bcrypt
- JWT token generation
- Input validation
- Error handling

#### `/server/controllers/productController.js`
**Purpose:** Product CRUD operations
**Exports:**
- `getProducts(req, res)` - Get all products
- `getProduct(req, res)` - Get single product
- `createProduct(req, res)` - Create new product
- `updateProduct(req, res)` - Update existing product
- `deleteProduct(req, res)` - Delete product

**Features:**
- Owner/admin authorization
- Population of user references
- Input validation

#### `/server/middleware/auth.js`
**Purpose:** Authentication & authorization middleware
**Exports:**
- `protect` - Verify JWT token
- `authorize(...roles)` - Check user roles

**Features:**
- Token extraction from headers
- Token verification
- User attachment to request
- Role-based access control

#### `/server/models/User.js`
**Purpose:** User database schema
**Schema Fields:**
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (user/admin)
- `createdAt` - Registration timestamp

**Methods:**
- `comparePassword(password)` - Compare passwords

**Hooks:**
- Pre-save: Hash password before saving

#### `/server/models/Product.js`
**Purpose:** Product database schema
**Schema Fields:**
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `category` - Product category
- `stock` - Available quantity
- `imageUrl` - Product image URL
- `createdBy` - Reference to User
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

**Hooks:**
- Pre-save: Update timestamp

#### `/server/routes/authRoutes.js`
**Purpose:** Authentication route definitions
**Routes:**
- `POST /signup` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

#### `/server/routes/productRoutes.js`
**Purpose:** Product route definitions
**Routes:**
- `GET /` - Get all products
- `POST /` - Create product (protected)
- `GET /:id` - Get single product
- `PUT /:id` - Update product (protected)
- `DELETE /:id` - Delete product (protected)

#### `/server/server.js`
**Purpose:** Main server entry point
**Responsibilities:**
- Express app initialization
- Middleware setup (CORS, body-parser)
- Route mounting
- Database connection
- Error handling
- Server startup

---

### Frontend Files

#### `/src/app/core/models/user.model.ts`
**Purpose:** User-related TypeScript interfaces
**Exports:**
- `User` - User data structure
- `AuthResponse` - API auth response
- `LoginRequest` - Login payload
- `SignupRequest` - Signup payload

#### `/src/app/core/models/product.model.ts`
**Purpose:** Product-related TypeScript interfaces
**Exports:**
- `Product` - Product data structure
- `ProductResponse` - API product response
- `CreateProductRequest` - Create payload
- `UpdateProductRequest` - Update payload

#### `/src/app/core/services/auth.service.ts`
**Purpose:** Authentication service
**Properties:**
- `currentUser` - Signal for current user
- `isAuthenticated` - Signal for auth status

**Methods:**
- `signup(data)` - Register user
- `login(data)` - Login user
- `getMe()` - Get current user
- `logout()` - Logout user
- `getToken()` - Get JWT token
- `isLoggedIn()` - Check auth status

**Features:**
- LocalStorage integration
- Reactive signals
- HTTP interceptors ready
- Token management

---

### Configuration Files

#### `/.env`
**Purpose:** Environment variables (NEVER COMMIT)
**Variables:**
- `NODE_ENV` - Environment mode
- `PORT` - Server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - Token expiration time

#### `/package.json`
**Purpose:** Project metadata and dependencies
**Scripts:**
- `start` - Start Angular dev server
- `build` - Build Angular app
- `server` - Start backend (production)
- `server:dev` - Start backend (development)
- `test` - Run tests

**Dependencies:**
- Backend: express, mongoose, bcryptjs, jsonwebtoken, etc.
- Frontend: @angular/*, rxjs, etc.

#### `/tsconfig.json`
**Purpose:** TypeScript compiler configuration
**Settings:**
- Target: ES2022
- Module: ES2022
- Strict mode enabled
- Path mappings

#### `/angular.json`
**Purpose:** Angular CLI configuration
**Settings:**
- Build configurations
- Asset paths
- Style preprocessors
- Output paths

---

### Documentation Files

#### `/COMPLETE_DOCUMENTATION.md`
**Purpose:** Comprehensive project documentation
**Sections:**
- Project overview
- Architecture
- Backend documentation
- Frontend documentation
- API reference
- Setup guide
- Testing guide
- Deployment guide
- Troubleshooting

#### `/QUICK_START_GUIDE.md`
**Purpose:** Quick reference for getting started
**Contents:**
- 5-minute setup
- Quick test commands
- Common commands
- Troubleshooting

#### `/FILE_STRUCTURE.md`
**Purpose:** This file - explains project structure

#### `/server/API_DOCUMENTATION.md`
**Purpose:** Detailed API endpoint reference
**Contents:**
- All endpoints
- Request/response examples
- Error codes
- Authentication details

#### `/server/SETUP_GUIDE.md`
**Purpose:** Backend setup instructions
**Contents:**
- Installation steps
- MongoDB setup
- Testing procedures
- Troubleshooting

#### `/MONGODB_INSTALL.md`
**Purpose:** MongoDB installation guide
**Contents:**
- Installation options
- Docker setup
- MongoDB Atlas setup
- Verification steps

---

## File Naming Conventions

### Backend (JavaScript)
- **Controllers:** `*Controller.js` (camelCase)
- **Models:** `*.js` (PascalCase)
- **Routes:** `*Routes.js` (camelCase)
- **Config:** `*.js` (lowercase)

### Frontend (TypeScript)
- **Components:** `*.ts`, `*.html`, `*.css`
- **Services:** `*.service.ts`
- **Models:** `*.model.ts`
- **Guards:** `*.guard.ts`

### Documentation
- **Markdown:** `*.md` (UPPERCASE or PascalCase)

---

## Important Notes

### Files to NEVER Commit
- `.env` - Contains secrets
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.angular/` - Angular cache

### Files to Always Commit
- `.env.example` - Template for .env
- `package.json` - Dependencies list
- `package-lock.json` - Locked versions
- All source code
- Documentation

---

## Adding New Features

### Adding a New Backend Endpoint
1. Create controller function in `/server/controllers/`
2. Define route in `/server/routes/`
3. Add middleware if needed
4. Update API documentation

### Adding a New Frontend Page
1. Create component in `/src/app/pages/`
2. Add route in `/src/app/app.routes.ts`
3. Create service if needed in `/src/app/core/services/`
4. Add models in `/src/app/core/models/`

---

**Last Updated:** December 21, 2024

