install:
	install-deps

develop:
	npm run webpack -- --watch

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

lint:
	npm run eslint .

deploy:
	make build
	surge ./dist rss-z.surge.sh

