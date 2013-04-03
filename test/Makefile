test:
	npm install --dev
	mysql -u ubuntu circle_test < eoab_test.sql
	node_modules/vows/bin/vows unit-test/*-spec.js
	mysql -u ubuntu circle_test < eoab_test.sql
	node_modules/vows/bin/vows rest-api-end-point-test/*-spec.js
