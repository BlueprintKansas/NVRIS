## NVRIS

National Voting Registration Imaging Service

### Setup

Local setup:

```
% make deps
% make run # for local install
% make up # for docker install
```

### Deployment

1. Set up Serverless framework. https://serverless.com/framework/docs/providers/aws/guide/quick-start/
1. Verify that your ~/.aws/credentials profile is named "nvris-dev" for your AWS IAM creds.
1. From within project folder run `sls deploy --stage dev` (replace stage name as necessary)

### Usage

```
curl -XPOST -H 'Content-Type: application/json' --data @exampleFlexPayload.json the-nvris-url/vr/en
```

## On OSX

Ensure you are using the latest freetype and imagemagick.

```
brew update
brew upgrade freetype
brew upgrade imagemagick
```


## Local Docker setup

NodeJS and its dependancies can be a bit of a pain on OSX.  To help reduce
future development friction, we setup a Docker environment.

To get nvris running locally you can just run:

```shell
$ docker-compose up
```

Which will run nvris and expose it on `http://localhost:4500/`.

