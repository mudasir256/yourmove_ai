# Step 1: Build the React application
FROM node:16 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# If you're using yarn, copy yarn.lock and use yarn commands below

# Install dependencies
RUN npm install
# Or use `yarn install` if you're using yarn

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build
# Or use `yarn build` if you're using yarn

# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the built assets from the build stage to the default Nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Copy your custom Nginx configuration (if you have one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]

