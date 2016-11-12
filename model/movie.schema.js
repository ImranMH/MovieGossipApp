module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	MovieSchema = new Schema({
		title: String,
		imdbID: String,
		year: String,
		poster: String,
		director: String,
		plot: String,
		genre: String,
		likeUsers: [{type: Schema.Types.ObjectId, ref: "User"}],
		viewedUser: [{type: Schema.Types.ObjectId, ref: "User"}],
		intersetedUser: [{type: Schema.Types.ObjectId, ref: "User"}],
		addedBy: {type: Schema.Types.ObjectId, ref: "User"},		
	}, {collection: 'exp-populate-movie'});

	return MovieSchema;
}