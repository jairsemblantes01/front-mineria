FROM node:14-alpine as builder
COPY ["package.json", "package-lock.json", "/app/"]
WORKDIR /app
RUN npm install --only=production --silent
COPY [".", "/app/"]
RUN npm install --only=development --silent
RUN npm run build

# producción
FROM node:14-alpine
COPY [".", "/app/"]
WORKDIR /app
RUN npm install --only=production --silent
COPY --from=builder ["/app/.nuxt", "/app/.nuxt/"]
EXPOSE 3000
CMD ["npm", "start"]
