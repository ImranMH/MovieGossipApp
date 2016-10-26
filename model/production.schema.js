module.exports = function(mongoose) {

	var Schema = mongoose.Schema;

	productionSchema = new Schema({
		name: String,
		_id: Number,
		age: Number,
		movie: [{type: Schema.Types.ObjectId, ref: "Movie"}],
		city: String
	}, {collection: 'exp-populate-production'});

	return productionSchema;
}