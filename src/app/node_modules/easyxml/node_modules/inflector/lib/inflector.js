
/*!
 * Inflector
 * Copyright(c) 2011 Vadim Demedes <sbioko@gmail.com>
 * MIT Licensed
 */

/**
 * Library version.
 */

exports.version = '0.0.1';

String.prototype.trim = function() { // not inflector, just helper for its libraries
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

String.prototype.plural = function() {
	var s = this.trim().toLowerCase();
	end = s.substr(-1);
	if(end == 'y') {
		var vowels = ['a', 'e', 'i', 'o', 'u'];
		s = s.substr(-2, 1) in vowels ? s + 's' : s.substr(0, s.length-1) + 'ies';
	} else if(end == 'h') {
    	s += s.substr(-2) == 'ch' || s.substr(-2) == 'sh' ? 'es' : 's';
	} else if(end == 's') {
		s += 'es';
	} else {
		s += 's';
	}
	return s;
}

String.prototype.singular = function() {
	var s = this.trim().toLowerCase();
	var end = s.substr(-3);
	if(end == 'ies') {
		s = s.substr(0, s.length-3) + 'y';
	} else if(end == 'ses') {
		s = s.substr(0, s.length-2);
	} else {
		end = s.substr(-1);
		if(end == 's') {
			s = s.substr(0, s.length-1);
		}
	}
	return s;
}

String.prototype.camelize = function() {
	var s = 'x_' + this.trim().toLowerCase();
	s = s.replace(/[\s_]/g, ' ');
	s = s.replace(/^(.)|\s(.)/g, function($1) {
		return $1.toUpperCase();
	});
	return s.replace(/ /g, '').substr(1);
}

String.prototype.underscore = function() {
	return this.trim().toLowerCase().replace(/[\s]+/g, '_');
}

String.prototype.humanize = function() {
	var s = this.trim().toLowerCase().replace(/[_]+/g, ' ');
	s = s.replace(/^(.)|\s(.)/g, function($1) {
		return $1.toUpperCase();
	});
	return s;
}

