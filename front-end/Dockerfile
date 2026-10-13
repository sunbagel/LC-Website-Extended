# Use the official Node LTS image from Docker Hub (slim variant to reduce attack surface)
FROM node:20-slim

# Set working directory inside the container
WORKDIR /app

# Copy only the lock files first so Docker can cache the install layer.
# npm ci installs exactly what is in package-lock.json — no version resolution,
# no network calls beyond what the lockfile describes.
COPY package.json package-lock.json ./

RUN npm ci

# Copy the rest of the source after installing deps.
# (In dev mode this is overridden by the volume mount, but it lets the image
# work standalone too.)
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Start Vite dev server, binding to 0.0.0.0 so it is reachable from the host
CMD ["npx", "vite", "--host", "0.0.0.0"]
