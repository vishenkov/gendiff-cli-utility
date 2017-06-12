install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
build:
	rm -rf dist
	npm run build
publish:
	npm publish
patch:
	npm version patch
lint:
	npm run eslint

.PHONY: test