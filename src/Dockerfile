# Use a Node.js base image
FROM node:14-slim as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY src/package*.json ./

# Install the React dependencies
RUN npm ci

# Copy the React application code
COPY src/ .

# Build the React application
RUN npm run build

# Use a lightweight nginx base image for the final stage
FROM nginx:1.19-alpine

# Copy the built React application from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the nginx port
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]