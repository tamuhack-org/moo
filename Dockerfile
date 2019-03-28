FROM node:lts-slim
WORKDIR /usr/server
COPY src /usr/server/src
COPY test /usr/server/test
COPY views /usr/server/views
COPY .clang-format /usr/server/.clang-format
COPY *.json /usr/server/
RUN npm install
RUN npm run compile