# Use an official Node.js runtime as a parent image.
# Using a specific version like node:20-alpine is recommended for stability and smaller image size.
FROM node:20-alpine

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and package-lock.json to the working directory.
# This allows Docker to cache the npm install step if only source code changes, not dependencies.
COPY package*.json ./

# Install application dependencies.
RUN npm install

# Copy the rest of the application source code to the container.
COPY . .

# Expose the port your Node.js application listens on.
# Replace 3000 with the actual port your application uses.
EXPOSE 3000

# Define the command to run the application when the container starts.
# Replace 'app.js' with your application's entry point file.
CMD ["node", "app.js"]