# Dockerfile untuk React Vite Application

# Menggunakan Node.js 20 Alpine sebagai base image (required untuk Vite 7+)
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy semua source code ke container
COPY . .

# Build aplikasi untuk production
RUN npm run build

# Install serve untuk menjalankan aplikasi
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Jalankan aplikasi menggunakan serve
CMD ["serve", "-s", "dist", "-l", "3000"]