#!/bin/bash
BASE_URL="http://localhost:5000"

# 1. Login to get token and user ID
login_response=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

TOKEN=$(echo "$login_response" | jq -r '.data.token')
USER_ID=$(echo "$login_response" | jq -r '.data.user.id')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    # Try alternate email if test@example.com doesn't exist (from seed or previous conversation)
    login_response=$(curl -s -X POST $BASE_URL/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{
        "email": "hello@gmail.com",
        "password": "password123"
      }')
    TOKEN=$(echo "$login_response" | jq -r '.data.token')
    USER_ID=$(echo "$login_response" | jq -r '.data.user.id')
fi

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "Login failed. Ensure a user exists."
    exit 1
fi

echo "✓ Logged in. User ID: $USER_ID"

# 2. Prepare a "large" image (small enough for shell but large enough to test)
# This is about 2KB, not "large" (10MB), but tests the logic.
LARGE_IMAGE="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Af//Z"

# 3. Test Update Details with image
echo "Testing updateDetails with image..."
update_response=$(curl -s -X PUT $BASE_URL/api/auth/updatedetails \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"id\": \"$USER_ID\",
    \"firstName\": \"Test\",
    \"lastName\": \"User\",
    \"image\": \"$LARGE_IMAGE\"
  }")

# Check for success
SUCCESS=$(echo "$update_response" | jq -r '.success')
if [ "$SUCCESS" == "true" ]; then
    echo "✓ Update successful"
    RETURNED_IMAGE=$(echo "$update_response" | jq -r '.data.user.image')
    if [[ "$RETURNED_IMAGE" == data:image/jpeg;base64,* ]]; then
        echo "✓ Image returned correctly as base64 string"
    else
        echo "✗ Image format incorrect in response"
        echo "$update_response" | jq '.'
    fi
else
    echo "✗ Update failed"
    echo "$update_response" | jq '.'
fi
