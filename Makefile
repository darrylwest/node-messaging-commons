install:
	@make npm
	@( [ -d logs ] || mkdir logs )

npm:
	@npm install

test:
	@grunt test

watch:
	@grunt server

browser:
	cat browser/AbstractMessageClient.js browser/RemoteLogger.js browser/faye-browser.js > browser/browser-messaging-commons.js
	ls -l browser/browser-messaging-commons.js

.PHONY: install
.PHONY: npm
.PHONY: test
.PHONY: watch
.PHONY: browser
