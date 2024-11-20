FROM node:16.4.2-alpine

# Create app directory
WORKDIR /node-app

#Environment variables
ENV NODE_ENV=production
ENV PORT=4000
ENV DEBUG=app:prod

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY config ./config
COPY .git ./.git
COPY src/entities/health/config/envsData.ts ./src/entities/health/config/envsData.ts

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Copy app from src to dist
RUN npm run build

EXPOSE 4000

CMD [ "node", "./dist/framework/index.js" ]

# Image command:
# docker build -t node_app_image .

# Create container:
# docker run --name node-app-container --network host -p 4000:4000 -d --restart unless-stopped node_app_image

# Log container:
# docker container logs node-app-container

# Kill container:
# docker container rm node-app-container -f
