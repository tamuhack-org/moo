FROM node:lts-slim
WORKDIR /usr/server
COPY src /usr/server/src
COPY .clang-format /usr/server/.clang-format
COPY *.json /usr/server/
RUN npm install
RUN npm run compile