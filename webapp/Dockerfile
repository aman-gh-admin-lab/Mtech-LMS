# ---------- Stage 1: Build the React app ----------
FROM node:20-alpine AS build
WORKDIR /frontend

# Copy package files first for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app (Vite/React)
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html

# Optional: replace default nginx config for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
