# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the React project
RUN npm run build

# Serve the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
