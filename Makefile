run:
	sls offline start --port 4500

test:
	npm run test

deps:
	yarn install
	npm -g install serverless

deploy-dev:
	sls deploy --stage dev

deploy-prod:
	sls deploy --stage prod

.PHONY: run test deps
