module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	MovieSchema = new Schema({
		name: String,
		_director: [{type: Schema.Types.ObjectId, ref: "production"}],
		producer: [{type: Schema.Types.ObjectId, ref: "production"}],
		year: Number,
		plot: String,
		likeUsers: [{type: Schema.Types.ObjectId, ref: "user"}],
		genere: String
	}, {collection: 'exp-populate-movie'});

	return MovieSchema;
}