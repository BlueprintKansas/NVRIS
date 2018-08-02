## NVRIS

National Voting Registration Imaging Service

### to Deploy

1.  Set up Serverless framework. https://serverless.com/framework/docs/providers/aws/guide/quick-start/
2.  Verify that your ~/.aws/credentials profile is named "nvris-dev" for your AWS IAM creds.
3.  From within project folder run `sls deploy --stage dev` (replace stage name as necessary)
