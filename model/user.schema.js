var q = require('q')
module.exports = function( mongoose) {
	var MovieSchema = require('./movie.schema')(mongoose)

	var Schema = mongoose.Schema;

	UserSchema = new Schema({
		username: {type:String, lowercase: true},
		name: String,
		position: String,
		avater: {type: String, default: 'http://semantic-ui.com/images/avatar/large/christian.jpg'},
		age: Number,
		password: String,
		likeMovies: [{type: Schema.Types.ObjectId, ref: "Movie"}],
		addedMovies: [{type: Schema.Types.ObjectId, ref: "Movie"}],
		watchMovies: [{type: Schema.Types.ObjectId, ref: "Movie"}],
		interestedMovies: [{type: Schema.Types.ObjectId, ref: "Movie"}]
	}, {collection: 'expariments-user'})
	return UserSchema ;
}