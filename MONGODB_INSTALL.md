# MongoDB Installation Guide

## Option 1: Install MongoDB Community Edition (Recommended for Local Development)

### For Ubuntu/Debian:

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

## Option 2: Use Docker (Easiest)

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Check if running
docker ps

# Your connection string would be:
# mongodb://admin:password@localhost:27017/ngrx-store?authSource=admin
```

Update your `.env` file:
```env
MONGO_URI=mongodb://admin:password@localhost:27017/ngrx-store?authSource=admin
```

## Option 3: Use MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a new cluster (Free tier M0)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for development)
6. Get your connection string

Your connection string will look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ngrx-store?retryWrites=true&w=majority
```

Update your `.env` file with this connection string.

## Verify Installation

After installing MongoDB, verify it's running:

```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Or check the service status
sudo systemctl status mongod
```

## Quick Start with Docker (Recommended for Testing)

If you have Docker installed, this is the fastest way:

```bash
# Start MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:latest

# Your .env should have:
# MONGO_URI=mongodb://localhost:27017/ngrx-store
```

Then restart your server:
```bash
npm run server:dev
```

