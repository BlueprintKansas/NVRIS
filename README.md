## NVRIS

National Voting Registration Imaging Service

### Deployment

1.  Set up Serverless framework. https://serverless.com/framework/docs/providers/aws/guide/quick-start/
2.  Verify that your ~/.aws/credentials profile is named "nvris-dev" for your AWS IAM creds.
3.  From within project folder run `sls deploy --stage dev` (replace stage name as necessary)

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

