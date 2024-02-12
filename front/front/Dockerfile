FROM node:14
WORKDIR /app/front
COPY . .
RUN npm install
RUN npm install vite
RUN npm run build
ENTRYPOINT ["npm", "run", "dev"]