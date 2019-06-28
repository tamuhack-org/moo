FROM node:10.16.0-slim
WORKDIR /app
COPY src /app/src
COPY copyStaticAssets.ts /app/copyStaticAssets.ts
COPY tsconfig.json /app/tsconfig.json
COPY tslint.json /app/tslint.json
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm run gcp-build
EXPOSE 3000
CMD npm start