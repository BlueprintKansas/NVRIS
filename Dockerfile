FROM node:12

RUN apt-get update && apt-get install -y libfreetype6-dev ghostscript imagemagick

WORKDIR /code

COPY serverless.yml /code/serverless.yml
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

RUN npm -g install serverless

RUN yarn install

COPY . /code

EXPOSE 4500

CMD sls offline start --host 0.0.0.0 --port 4500 --dontPrintOutput
