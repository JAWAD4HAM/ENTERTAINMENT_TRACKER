# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create storage directory if it doesn't exist
RUN mkdir -p storage

# Expose port (default 3000, can be overridden by PORT env variable)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
