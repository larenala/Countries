FROM node:alpine

WORKDIR /app

COPY . /app

RUN npm ci
ARG REACT_APP_WEATHER_API_KEY
ENV REACT_APP_WEATHER_API_KEY=$REACT_APP_WEATHER_API_KEY

RUN npm run build 
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]
