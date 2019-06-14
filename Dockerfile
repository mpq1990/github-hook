FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

ENV SLACK_TOKEN=$SLACK_TOKEN
ENV SECRET_TOKEN=$SECRET_TOKEN
CMD [ "yarn", "dev" ]