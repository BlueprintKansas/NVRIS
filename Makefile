run:
	sls offline start --httpPort 4500 --dontPrintOutput

up:
	docker-compose up

test:
	perl test.pl

deps:
	yarn install
	npm -g install serverless
	sls plugin install -n serverless-pseudo-parameters
	sls plugin install -n serverless-webpack
	sls plugin install -n serverless-offline

deploy-dev:
	sls deploy --stage dev

deploy-prod:
	sls deploy --stage prod

cleanup-test:
	rm -f test-*.json-out.json
	rm -f test-*payload.png

.PHONY: run test deps cleanup-test
