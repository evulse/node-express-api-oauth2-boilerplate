test:
	pwd
	npm install
	mysql -u root -e 'CREATE DATABASE IF NOT EXISTS eoab_test'
	mysql -u root < eoab_test.sql
	node_modules/vows/bin/vows unit-test/*-spec.js
	mysql -u root < eoab_test.sql
	node_modules/vows/bin/vows rest-api-end-point-test/*-spec.js
	mysql -u root -e 'DROP DATABASE IF EXISTS eoab_test'
