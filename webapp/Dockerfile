# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build
WORKDIR /frontend

# Copy only package files from webapp/
COPY webapp/package*.json ./

RUN npm install

# Copy full app
COPY webapp/ .

RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine
COPY --from=build /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
