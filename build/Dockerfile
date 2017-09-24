FROM node:latest
COPY /src /src
# Create app directory
WORKDIR /src
# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

CMD ["npm", "start"]
