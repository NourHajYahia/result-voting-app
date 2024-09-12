# Stage 1: Build the React app
FROM node:16

# Set the working directory
WORKDIR /opt

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start nginx
CMD ["npm", "start"]
