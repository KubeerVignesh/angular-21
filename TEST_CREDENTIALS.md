# ✅ Test Credentials - WORKING

## 🔐 Use These Credentials in Your Angular App

### Test User 1
- **Email:** `test@test.com`
- **Password:** `123456`
- **Name:** Test User
- **Role:** user

### Test User 2
- **Email:** `newuser@test.com`
- **Password:** `123456`
- **Name:** New User
- **Role:** user

---

## ✅ Backend is Working!

Both signup and login are working correctly on the backend:

```bash
# Signup works ✅
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}'

# Login works ✅
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

---

## 🔍 If You're Still Getting 401 Error in Angular

### Check These Things:

1. **Are you using the EXACT credentials above?**
   - Email: `test@test.com` (all lowercase)
   - Password: `123456` (exactly 6 digits)

2. **Check Browser Console (F12)**
   - Look for any JavaScript errors
   - Check the Network tab for the actual request being sent

3. **Check Network Tab in DevTools**
   - Click on the `login` request
   - Look at **Request Payload** - should be:
     ```json
     {
       "email": "test@test.com",
       "password": "123456"
     }
     ```
   - Look at **Response** - what does it say?

4. **Clear Browser Cache and LocalStorage**
   ```javascript
   // Open browser console and run:
   localStorage.clear();
   location.reload();
   ```

---

## 🧪 Test in Browser Console

Open your browser console (F12) and paste this:

```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@test.com',
    password: '123456'
  })
})
.then(res => res.json())
.then(data => console.log('Login response:', data))
.catch(err => console.error('Login error:', err));
```

**Expected Output:**
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
    "token": "eyJ..."
  }
}
```

---

## 🎯 Step-by-Step Login Test

1. **Open your Angular app** in browser: http://localhost:4200

2. **Go to Login page**

3. **Enter these credentials:**
   - Email/Phone: `test@test.com`
   - Password: `123456`

4. **Click Sign In**

5. **Open DevTools (F12) → Network tab**

6. **Look for the POST request to** `http://localhost:5000/api/auth/login`

7. **Check the response:**
   - If **200 OK** → Login successful! ✅
   - If **401 Unauthorized** → Wrong credentials or user doesn't exist ❌
   - If **400 Bad Request** → Missing email or password ❌
   - If **500 Server Error** → Backend error ❌

---

## 🐛 Common Issues

### Issue 1: "Invalid credentials" (401)
**Cause:** Wrong email or password, or user doesn't exist

**Solution:** 
- Make sure you're using `test@test.com` and `123456`
- Try signing up first, then login with same credentials

### Issue 2: "Please provide email and password" (400)
**Cause:** Email or password field is empty

**Solution:**
- Check that both fields are filled
- Check browser console for form validation errors

### Issue 3: CORS Error
**Cause:** Backend CORS not configured

**Solution:** Backend already has CORS enabled, but check if server is running

### Issue 4: "Cannot POST /api/auth/login"
**Cause:** Backend server is not running

**Solution:**
```bash
npm run server:dev
```

---

## 📝 Create Your Own Test User

### Via Angular App:
1. Go to Register page
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: yourpassword (min 6 chars)
3. Click Register
4. Then login with same credentials

### Via cURL:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your@email.com",
    "password": "yourpassword"
  }'
```

---

## ✅ Checklist

Before trying to login, make sure:

- [ ] Backend server is running (`npm run server:dev`)
- [ ] MongoDB is running (`sudo systemctl status mongod`)
- [ ] Frontend is running (`npm start`)
- [ ] You're using correct credentials: `test@test.com` / `123456`
- [ ] Browser console shows no errors
- [ ] Network tab shows request is being sent to `http://localhost:5000/api/auth/login`

---

## 🎉 Success Indicators

When login works, you should see:

1. **Network tab:** 200 OK response
2. **Console:** No errors
3. **LocalStorage:** `token` and `user` stored
4. **Navigation:** Redirected to home page or products page
5. **UI:** User is logged in

---

## 💡 Quick Debug

If still not working, add this to your login component's `onSubmit` method:

```typescript
console.log('Sending login request:', loginData);
```

This will show you exactly what data is being sent to the backend.

---

**Last Updated:** December 30, 2024

**Status:** ✅ Backend Working | Test Users Created

