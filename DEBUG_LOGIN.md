# Login 401 Error - Debugging Guide

## 🔍 Problem
Getting **401 Unauthorized** when trying to login at `http://localhost:5000/api/auth/login`

---

## ✅ Quick Fixes to Try

### 1. **Check if User Exists in Database**

Open a new terminal and run:

```bash
# Connect to MongoDB
mongosh

# Switch to your database
use ngrx-store

# Check if users exist
db.users.find().pretty()

# Exit
exit
```

**If no users exist:** You need to signup first!

---

### 2. **Create a Test User via API**

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "123456"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@test.com",
      "role": "user"
    },
    "token": "..."
  }
}
```

---

### 3. **Test Login with Correct Credentials**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "123456"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Test User",
      "email": "test@test.com",
      "role": "user"
    },
    "token": "..."
  }
}
```

---

## 🐛 Common Causes of 401 Error

### Cause 1: User Doesn't Exist
**Solution:** Signup first before trying to login

### Cause 2: Wrong Email
**Check:** Make sure email is exactly the same (case-insensitive)
- ✅ `test@test.com`
- ❌ `Test@test.com` (will work - emails are lowercase)
- ❌ `test@example.com` (different email)

### Cause 3: Wrong Password
**Check:** Password is case-sensitive
- ✅ `123456`
- ❌ `12345` (too short)
- ❌ `1234567` (different)

### Cause 4: Missing Email or Password
**Check:** Both fields are required
```json
{
  "email": "test@test.com",  // Required
  "password": "123456"        // Required
}
```

---

## 🔧 Debug Your Frontend Request

### Check Browser Network Tab

1. Open **Chrome DevTools** (F12)
2. Go to **Network** tab
3. Try to login
4. Click on the `login` request
5. Check **Request Payload**:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

6. Check **Response**:

**If 401:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

This means either:
- User doesn't exist with that email
- Password is incorrect

---

## 🔍 Check Backend Logs

Look at your backend terminal where `npm run server:dev` is running.

You should see logs like:
```
POST /api/auth/login 401 - - ms
```

---

## 🧪 Step-by-Step Testing

### Step 1: Verify Backend is Running
```bash
curl http://localhost:5000/api/auth/login
```

Should return: `Cannot GET /api/auth/login` (because it needs POST)

### Step 2: Signup a New User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Debug User","email":"debug@test.com","password":"password123"}'
```

### Step 3: Login with Same Credentials
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"debug@test.com","password":"password123"}'
```

### Step 4: Try from Frontend
Use the exact same email and password in your Angular app.

---

## 💡 Quick Solution

**Most likely issue:** You're trying to login with a user that doesn't exist yet.

**Fix:**
1. First **signup** with email and password
2. Then **login** with the SAME email and password

---

## 🔐 Password Requirements

- Minimum 6 characters
- Case-sensitive
- No special requirements (for now)

---

## 📝 Example Working Flow

```bash
# 1. Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"mypassword"}'

# Response: success: true, token: "..."

# 2. Login with SAME credentials
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"mypassword"}'

# Response: success: true, token: "..."
```

---

## 🚨 Still Not Working?

### Add Debug Logging to Backend

Edit `server/controllers/authController.js` line 63:

```javascript
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // ADD THIS DEBUG LOG
    console.log('Login attempt:', { email, password: '***' });

    // Validate email & password
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    
    // ADD THIS DEBUG LOG
    console.log('User found:', user ? 'YES' : 'NO');

    if (!user) {
      console.log('User not found with email:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    
    // ADD THIS DEBUG LOG
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // ... rest of code
  }
};
```

Then check your backend terminal for these logs.

---

## ✅ Checklist

- [ ] Backend server is running (`npm run server:dev`)
- [ ] MongoDB is running (`sudo systemctl status mongod`)
- [ ] User exists in database (check with mongosh)
- [ ] Email is correct (case-insensitive)
- [ ] Password is correct (case-sensitive, min 6 chars)
- [ ] Request has both email and password
- [ ] Content-Type header is `application/json`

---

## 🎯 Most Likely Solution

**Try this in your Angular app:**

1. **First Signup:**
   - Email: `test@test.com`
   - Password: `123456`
   - Name: `Test User`

2. **Then Login:**
   - Email: `test@test.com`
   - Password: `123456`

Make sure you use the EXACT same credentials!

