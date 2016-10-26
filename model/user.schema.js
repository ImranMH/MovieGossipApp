var q = require('q')
module.exports = function( mongoose) {
	var MovieSchema = require('./movie.schema')(mongoose)

	var Schema = mongoose.Schema;

	UserSchema = new Schema({
		username: String,
		name: String,
		position: String,
		avater: String,
		age: Number,
		password: String,
		likeMovies: [MovieSchema]
	}, {collection: 'expariments-user'})
	return UserSchema ;
}