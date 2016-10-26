var q = require('q')
module.exports = function( mongoose) {
	var MovieSchema = require('./movie.schema')(mongoose)

	var Schema = mongoose.Schema;

	UserSchema = new Schema({
		username: String,
		name: String,
		position: String,
		avater: {type: String, default: 'http://semantic-ui.com/images/avatar/large/christian.jpg'},
		age: Number,
		password: String,
		likeMovies: [MovieSchema]
	}, {collection: 'expariments-user'})
	return UserSchema ;
}