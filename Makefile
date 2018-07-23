install:
	install-deps

develop:
	npm run webpack-serve

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish

