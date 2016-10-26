//var q = require('q')
module.exports = function(mongoose, q) {
	var UserSchema = require('./user.schema')(mongoose)


	var User = mongoose.model('user', UserSchema);
	var api = {
		findAll : findAll,
		findUserById : findUserById,
		findUsersByIds : findUsersByIds,
		findUserByCredientials : findUserByCredientials,
		createUser : createUser,
		movieLikedUser : movieLikedUser,
		findByCredientials: findByCredientials,
		userDb: userDb()
	}
	return api;

	function findAll () {
		var deffered = q.defer()
		User.find({}, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				deffered.resolve(user)
			}
		})
		return deffered.promise;
	}

	function findUserById (userid) {
		var deffered = q.defer()
		User.findOne({_id: userid}, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				deffered.resolve(user)
			}
		})
		return deffered.promise;
	};
	function findUserByCredientials (credientials) {
		var deffered = q.defer()
		User.findOne({username: credientials.username,
				password:credientials.password},
				function(err, user){
			if (err) {
				console.log('rejected');
				deffered.reject(err)
			} else {
				console.log('resolved:'+ user);
				deffered.resolve(user)
			}
		})
		return deffered.promise;
	}
	function createUser (user) {
		var deffered = q.defer()
		User.create(user, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				deffered.resolve(user)
			}
		})
		return deffered.promise;
	}

	function findByCredientials (credientials) {

		User.findOne({username: credientials.username,
				password: credientials.password});
	
	};
	function movieLikedUser (userid, movie) {
		var deffered = q.defer()
		User.findOne({_id:userid._id}, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				console.log("return user....: "+user);
				user.likeMovies.push(movie._id);
				user.save(function(err, user){
					if (err) {
						deffered.reject(err)
					} else {
						deffered.resolve(user)
					}
				})
			}
		})
		return deffered.promise;
	};


	function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        User.find({
            _id:{$in: userIds}
        }, function (err, users) {
            if (err) {
                deferred.reject(err);
                //console.log(users);
            } else {
            	
                deferred.resolve(users);
            }
        });

        return deferred.promise;
	}

	function userDb(){
		return User;
	}


};

