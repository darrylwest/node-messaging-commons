JSFILES=bin/*.js lib/*/*.js lib/*.js test/*.js test/*/*.js
TESTFILES=test/*.js test/controllers/*.js test/browser/*.js test/services/*.js
JSHINT=node_modules/.bin/jshint
MOCHA=node_modules/.bin/mocha

install:
	@make npm
	@( [ -d logs ] || mkdir logs )

npm:
	@npm install

jshint:
	@( $(JSHINT) --verbose --reporter node_modules/jshint-stylish/ $(TESTFILES) $(JSFILES) )

test:
	@( $(MOCHA) $(TESTFILES) )
	@( make jshint )

watch:
	@( node ./watcher.js )

browser:
	cat browser/AbstractMessageClient.js browser/RemoteLogger.js browser/faye-browser.js > browser/browser-messaging-commons.js
	ls -l browser/browser-messaging-commons.js

.PHONY: install
.PHONY: npm
.PHONY: test
.PHONY: watch
.PHONY: browser
