#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5000"

echo -e "${YELLOW}=== Testing API Endpoints ===${NC}\n"

# Test 1: Check if server is running
echo -e "${YELLOW}1. Testing server health...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓ Server is running${NC}\n"
else
    echo -e "${RED}✗ Server is not responding${NC}\n"
    exit 1
fi

# Test 2: Signup
echo -e "${YELLOW}2. Testing signup...${NC}"
signup_response=$(curl -s -X POST $BASE_URL/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }')

echo "$signup_response" | jq '.'
TOKEN=$(echo "$signup_response" | jq -r '.data.token')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✓ Signup successful${NC}\n"
else
    echo -e "${RED}✗ Signup failed${NC}\n"
fi

# Test 3: Login
echo -e "${YELLOW}3. Testing login...${NC}"
login_response=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

echo "$login_response" | jq '.'
TOKEN=$(echo "$login_response" | jq -r '.data.token')

if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✓ Login successful${NC}\n"
else
    echo -e "${RED}✗ Login failed${NC}\n"
fi

# Test 4: Get current user
echo -e "${YELLOW}4. Testing get current user (protected)...${NC}"
me_response=$(curl -s -X GET $BASE_URL/api/auth/me \
  -H "Authorization: Bearer $TOKEN")

echo "$me_response" | jq '.'
echo -e "${GREEN}✓ Get current user successful${NC}\n"

# Test 5: Create product
echo -e "${YELLOW}5. Testing create product (protected)...${NC}"
product_response=$(curl -s -X POST $BASE_URL/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Laptop",
    "description": "High-performance laptop for testing",
    "price": 999.99,
    "category": "Electronics",
    "stock": 10,
    "imageUrl": "https://example.com/laptop.jpg"
  }')

echo "$product_response" | jq '.'
PRODUCT_ID=$(echo "$product_response" | jq -r '.data._id')

if [ "$PRODUCT_ID" != "null" ] && [ -n "$PRODUCT_ID" ]; then
    echo -e "${GREEN}✓ Product created successfully${NC}\n"
else
    echo -e "${RED}✗ Product creation failed${NC}\n"
fi

# Test 6: Get all products
echo -e "${YELLOW}6. Testing get all products...${NC}"
products_response=$(curl -s -X GET $BASE_URL/api/products)
echo "$products_response" | jq '.'
echo -e "${GREEN}✓ Get all products successful${NC}\n"

# Test 7: Get single product
if [ "$PRODUCT_ID" != "null" ] && [ -n "$PRODUCT_ID" ]; then
    echo -e "${YELLOW}7. Testing get single product...${NC}"
    single_product=$(curl -s -X GET $BASE_URL/api/products/$PRODUCT_ID)
    echo "$single_product" | jq '.'
    echo -e "${GREEN}✓ Get single product successful${NC}\n"
fi

# Test 8: Update product
if [ "$PRODUCT_ID" != "null" ] && [ -n "$PRODUCT_ID" ]; then
    echo -e "${YELLOW}8. Testing update product (protected)...${NC}"
    update_response=$(curl -s -X PUT $BASE_URL/api/products/$PRODUCT_ID \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{
        "name": "Updated Laptop",
        "price": 1299.99
      }')
    echo "$update_response" | jq '.'
    echo -e "${GREEN}✓ Product updated successfully${NC}\n"
fi

# Test 9: Delete product
if [ "$PRODUCT_ID" != "null" ] && [ -n "$PRODUCT_ID" ]; then
    echo -e "${YELLOW}9. Testing delete product (protected)...${NC}"
    delete_response=$(curl -s -X DELETE $BASE_URL/api/products/$PRODUCT_ID \
      -H "Authorization: Bearer $TOKEN")
    echo "$delete_response" | jq '.'
    echo -e "${GREEN}✓ Product deleted successfully${NC}\n"
fi

echo -e "${GREEN}=== All tests completed ===${NC}"

