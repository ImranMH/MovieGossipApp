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
		likeUsers: [{type: Schema.Types.ObjectId, ref: "user"}],
		viewedUser: [{type: Schema.Types.ObjectId, ref: "user"}],
		intersetedUser: [{type: Schema.Types.ObjectId, ref: "user"}],
		addedBy: [{type: Schema.Types.ObjectId, ref: "user"}],		
	}, {collection: 'exp-populate-movie'});

	return MovieSchema;
}