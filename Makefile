run:
	sls offline start --port 4500 --dontPrintOutput

test:
	perl test.pl

deps:
	yarn install
	npm -g install serverless

deploy-dev:
	sls deploy --stage dev

deploy-prod:
	sls deploy --stage prod

cleanup-test:
	rm -f test-*.json-out.json
	rm -f test-*payload.png

.PHONY: run test deps cleanup-test
