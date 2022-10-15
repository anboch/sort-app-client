FROM node:16.16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
# ENV NODE_ENV production
# RUN npm run build
# RUN npm prune --production
# todo prune src
# CMD ["npm", "start"]
# EXPOSE 3000