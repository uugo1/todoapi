FROM node:latest
COPY /api /api
COPY /helper /helper

# copy server.js and paage.json
 COPY package.json ./
 COPY server.js ./
# Install app dependencies
RUN npm install
RUN npm install -g nodemon
EXPOSE 5000
CMD ["npm", "start"]
