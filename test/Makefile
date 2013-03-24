test:
	npm install --dev
	node_modules/vows/bin/vows unit-test/*-spec.js
	mysql -u ubuntu circle_test < src/database/express-api-boilerplate-dev.sql
	node_modules/vows/bin/vows rest-api-end-point-test/*-spec.js
