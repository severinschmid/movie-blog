# pull official base image
FROM node:16.13-slim

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .npmrc /app/
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# add app
COPY . ./

# start app
CMD ["npm", "start"]