module.exports = function(mongoose,q){
	productionSchema = require('./production.schema')(mongoose)

	Production = mongoose.model('Production', productionSchema);

	var api = {
		postDirector: postDirector,
		gettest: gettest,
		getAll : getAll

	}
	return api;

	function postDirector(data) {
		console.log("enter");
		var deffered = q.defer();
		Production.create(data, function(err, director){
			if(err) {
				deffered.reject(err)
			} else {
				deffered.resolve(director)
			}
		})

		return deffered.promise;
	}


	function gettest(data) {
			var deffered = q.defer();
		var production = new Production({
				_id: data.id,
				name: data.name,
				age: data.age,
				city: data.city
			})
		console.log(production);
			production.save(function(err, dirc){
				if(err) {
					deffered.reject(err)
				} else {
					deffered.resolve(dirc)
					console.log('h');
				}
			})
			return deffered.promise;
		}

	function getAll() {
		console.log("enter");
		var deffered = q.defer();
		Production.find({}, function(err, director){
			if(err) {
				deffered.reject(err)
			} else {
				deffered.resolve(director)
			}
		})

		return deffered.promise;
	}


}	