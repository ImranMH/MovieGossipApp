//var q = require('q')
module.exports = function(mongoose, q) {
	var UserSchema = require('./user.schema')(mongoose)


	var User = mongoose.model('user', UserSchema);
	var api = {
		findAll : findAll,
		findUserById : findUserById,
		findUsersByIds : findUsersByIds,
		findUserByCredientials : findUserByCredientials,
		findByCredientials: findByCredientials,
		movieLikedUser : movieLikedUser,
		movieAddedUser : movieAddedUser,
		movieWatchUser : movieWatchUser,
		//userWatchMovie : userWatchMovie,
		registerUser : registerUser,
		createUser : createUser,
		updateUser: updateUser,
		deleteUserById: deleteUserById,
		changePwd: changePwd,
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
				//console.log('rejected');
				deffered.reject(err)
			} else {
				//console.log('resolved:'+ user);
				deffered.resolve(user)
			}
		})
		return deffered.promise;
	}
	// register user
	function registerUser(user) {
		var deffered = q.defer()
		var newUser = new User();
		newUser.username = user.username;
		newUser.name = user.name;
		newUser.password = newUser.generateHash(user.password);
		newUser.save(function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				deffered.resolve(user)
			}
		});
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
/* change password*/

function changePwd(user, data) {
	var deffered = q.defer()
		User.findOne({username: user.username}, function(err, user){
			if (err) {
				res.json(err)
			} else if (!user.validPassword(data.oldPassword)){
				deffered.reject("Password is incerrect")
			} else {
				user.password = user.generateHash(data.newPassword);
				user.save(function(err, doc) {
					if(err) {
						deffered.reject(err)
					} else {
						deffered.resolve(doc)
					}
				})
			}
		});
		return deffered.promise;
}
/* login request handle*/
	function findByCredientials (credientials) {
		var deffered = q.defer()
		User.findOne({username: credientials.username}, function(err, user){
			if (err) {
				deffered.reject(err)
			} else if (!user.validPassword(credientials.password)){
				deffered.reject("Password is incerrect")
			} else {
				deffered.resolve(user)
			}
		});
		return deffered.promise;
	};
	function movieLikedUser (userid, movie) {
		var deffered = q.defer()
		User.findOne({_id:userid._id}, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				//console.log("return user....: "+user);
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
/* movie added by */
	function movieAddedUser (userid, movie) {
		var deffered = q.defer()
		User.findById(userid, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				//console.log("return user....: "+user);
				user.addedMovies.push(movie._id);
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

/* movie watch by user */
	function movieWatchUser (userid, movie) {
		var deffered = q.defer()
		User.findById(userid, function(err, user){
			if (err) {
				deffered.reject(err)
			} else {
				//console.log("return user....: "+user);
				user.watchMovies.push(movie._id);
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
/*update user database*/
	function updateUser (userid, data) {
		var deferred = q.defer()
		User.findOne({_id:userid._id}, function(err, user){
			if (err) {
				deferred.reject(err)
			} else {
				user.update({
					name: data.name,
					age: data.age,
					position: data.position,
					avater: data.avater
				},function(err, user){
					if (err) {
                deferred.reject(err);
                //console.log(users);
            } else {
            	
                deferred.resolve(user);
            }
				})
			}
		})
		return deferred.promise;
	};

/*Delete user from database (Deactivate Account)*/
	function deleteUserById (userid) {
		var deferred = q.defer()
		User.findById(userid, function(err, user){
			if (err) {
				deferred.reject(err)
			} else {
				user.remove(function(err, user){
					if (err) {
                deferred.reject(err);
            } else {            	
                deferred.resolve(user);
            }
				});
			}
		})
		return deferred.promise;
	};
/*User who watched movie*/
	/*function deleteUserById (userid) {
		var deferred = q.defer()
		User.findById(userid, function(err, user){
			if (err) {
				deferred.reject(err)
			} else {
				user.remove(function(err, user){
					if (err) {
                deferred.reject(err);
            } else {            	
                deferred.resolve(user);
            }
				});
			}
		})
		return deferred.promise;
	};*/
	function userDb(){
		return User;
	}


};

