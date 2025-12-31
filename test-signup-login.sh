#!/bin/bash

echo "🧪 Testing Signup and Login"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Signup
echo "📝 Test 1: Signup new user"
echo "Email: test@test.com"
echo "Password: 123456"
echo ""

SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"123456"}')

echo "Response:"
echo "$SIGNUP_RESPONSE" | jq '.'
echo ""

# Check if signup was successful
if echo "$SIGNUP_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Signup successful!${NC}"
  
  # Extract token
  TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.data.token')
  echo "Token: $TOKEN"
else
  echo -e "${RED}❌ Signup failed!${NC}"
  
  # Check if user already exists
  if echo "$SIGNUP_RESPONSE" | grep -q "already exists"; then
    echo -e "${YELLOW}⚠️  User already exists. Trying login...${NC}"
  else
    echo "Error: Check the response above"
    exit 1
  fi
fi

echo ""
echo "================================"
echo ""

# Test 2: Login
echo "🔐 Test 2: Login with same credentials"
echo "Email: test@test.com"
echo "Password: 123456"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}')

echo "Response:"
echo "$LOGIN_RESPONSE" | jq '.'
echo ""

# Check if login was successful
if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Login successful!${NC}"
  
  # Extract token
  TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token')
  echo "Token: $TOKEN"
  
  # Extract user info
  USER_NAME=$(echo "$LOGIN_RESPONSE" | jq -r '.data.user.name')
  USER_EMAIL=$(echo "$LOGIN_RESPONSE" | jq -r '.data.user.email')
  USER_ROLE=$(echo "$LOGIN_RESPONSE" | jq -r '.data.user.role')
  
  echo ""
  echo "User Info:"
  echo "  Name: $USER_NAME"
  echo "  Email: $USER_EMAIL"
  echo "  Role: $USER_ROLE"
else
  echo -e "${RED}❌ Login failed!${NC}"
  echo "Error: Check the response above"
  exit 1
fi

echo ""
echo "================================"
echo ""
echo -e "${GREEN}🎉 All tests passed!${NC}"
echo ""
echo "You can now use these credentials in your Angular app:"
echo "  Email: test@test.com"
echo "  Password: 123456"

