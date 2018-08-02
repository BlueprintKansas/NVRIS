run:
	sls offline start --port 4500

test:
	npm run test

deps:
	yarn install
	npm -g install serverless

.PHONY: run test deps
