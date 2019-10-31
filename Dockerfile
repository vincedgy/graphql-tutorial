FROM node:lts-alpine

# Create app directory as 'node' user
WORKDIR /usr/src/app

# Copy all needed files (given the .dockerignore file)
COPY . .

# Install dependencies
RUN npm install

# Compile and build (see package.json scripts)
RUN npm run build

# Now we will expose a default port
EXPOSE 4000

# Then we should launch the app
CMD [ "node", "dist-prod/bundle.js" ]
