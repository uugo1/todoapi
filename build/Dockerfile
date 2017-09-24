FROM node:latest
COPY /api /api
# Create app directory
WORKDIR /api
# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
