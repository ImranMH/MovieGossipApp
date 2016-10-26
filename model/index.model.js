var mongoose = require('mongoose');
var q = require('q')

module.exports = {
	movie: require('./movie.model')(mongoose, q),
	production: require('./production.model')(mongoose, q),
	user: require('./user.model')(mongoose, q)
}