# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /frontend

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf  # Uncomment if using React Router

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
