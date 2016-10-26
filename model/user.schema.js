var q = require('q')
module.exports = function( mongoose) {
	var MovieSchema = require('./movie.schema')(mongoose)

	var Schema = mongoose.Schema;

	UserSchema = new Schema({
		username: String,
		name: String,
		password: String,
		likeMovies: [MovieSchema]
	}, {collection: 'expariments-user'})
	return UserSchema ;
}