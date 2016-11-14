var mongoose = require('mongoose');
var express = require('express');
  
//var User = require('../model/user.model')( mongoose);
//var Movie = require('../model/movie.model')( mongoose);
var q = require('q') // included only for expariments
var Movie = require('../model/index.model').movie
var User = require('../model/index.model').user
var router = express.Router();
  router.use(function(req, res, next) {
      var xxx =res.locals.session_user = req.session.user || {};
        next()
  })
  /* user json file for testing purpose*/
router.get('/json', findUserJson);
  function findUserJson(req, res) {
      User.findAll().then( function(user){
        
        res.json(user)
      }, function(err) {
          res.status(400).send(err)
      })
  }
/* get all user list*/
router.get('/', findUser);
    function findUser(req, res) {
      User.findAll().then( function(user){
        res.format({
          html: function() {
            res.render('user', {user: user})
          },
          json: function() {
            res.json(user)
          }
        })
        
      }, function(err) {
          res.status(400).send(err)
      })
    }
    //app.get('/user', createAll)
    //router.post('/login',findLUser /*findLoginUser*/)
  router.route('/register')
    .get(renderRegister)
    .post(registerUser);
    
    function renderRegister(req, res) {
      res.render('register')
    };

    function registerUser(req, res) {
      //console.log("post Register");
      var user = req.body
      User.registerUser(user).then( function(user){
        //console.log("creating a user:"+ user);
        res.redirect('/user/login')
      }, function(err) {
        res.status(400).send(err)
      })
    };

  router.route('/login')
    .get(loginUser)
    .post(LoginFunc)
    /* login interface*/
    function loginUser(req, res) {
       res.render('login')
    }
  /* login a user*/  
  function LoginFunc(req, res) {
    var user = req.body;
    User.findByCredientials(user).then(function(user){
      if (user){
        req.session.user = user;
        var hour = 36000000;
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
        res.redirect('profile')
      } else {
        res.json('no user')
      }
    }, function(err){
      res.redirect('/user/login')
    })
  }
  
  router.route('/profile')
    .get(findUserProfile);
    function findUserProfile(req, res) {

      var userId = req.session.user._id
      var sessionUser = req.session.user;
      User.findUserById(userId).then(function(user){
        //console.log("profile route: "+user);
        var likeMovies = user.likeMovies;
        
        return Movie.findMovieByIds(likeMovies).then(function(mov) {
         // console.log("return from voie :"+ mov);
          res.format({
            html: function () {
              res.render('profile',{sessionUser: sessionUser, movie: mov,searchUser: user}) 
            },
            json: function () {
              res.json({sessionUser:sessionUser,movie:mov, user:user})
            }
            }); 
          },function(err){
          res.json(err)
        })        
      });
    }
  router.get('/profile/userAction', profileUserActions);
    function profileUserActions(req, res){
      var userId = req.session.user._id;
      
      User.movieActionUser(userId).then(function(user){
        res.json(user)
      }, function(err) {
        res.json(err)
      })
        
    }
      /*edit profile*/
  router.route('/profile/edit')
    .put(updateProfile)

    function updateProfile(req,res) {
         
      var user = req.session.user._id;
      var data = req.body
      console.log("in user route"+ data);
      User.updateUserProfile(user, data).then(function(user){
        res.json(user)
      })
    }
    /*change password*/
  router.post('/profile/changePassword', changePassword);
    function changePassword(req, res) {
      console.log("here");
      var currentUser = req.session.user
      var changeP = req.body
      User.changePwd(currentUser,changeP).then(function(data){
        res.json(data)
      }, function(err) {
        res.json("old password dont match")
      })
      console.log(currentUser.password);
      /*if (changeP.oldPassword === currentUser.password) {
        console.log(currentUser.password);
      }*/
    }

    // follow user
router.route('/profile/follow')
  .post(startFollowing)
  function startFollowing(req, res){
    var followerUserId = req.session.user._id;
    var followingUserId = req.body._id;
    User.followingRegister(followerUserId, followingUserId).then(function(CurrentUser){
      return User.followerRegister(followingUserId, followerUserId).then(function(followingUser){
        res.json({currentUser:CurrentUser, followIngUser: followingUser })
      }, function (err) {
        res.json(err)
      })
    })
  }

    /*find a profile when clicked*/
  router.get('/:id', findUserProfileWithID);

     function findUserProfileWithID(req,res) {
      var userId = req.params.id
      //console.log("looking for: "+userId);
      var sessionUser = req.session.user;
      User.findUserById(userId).then(function(user){
        
        var likeMovies = user.likeMovies;
        //console.log("return from user :"+ mov);
         //console.log("profile route: "+mlu);
        return Movie.findMovieByIds(likeMovies).then(function(mov) {
          
           res.format({
            html: function () {
              
               //res.json({movie:movie, user:user})
              res.render('profile',{sessionUser: sessionUser, movie: mov, searchUser: user}) 
            },
            json: function () {
              //console.log("return from json :"+ user)
              res.json({user:user})
            }
          }) 
          
        },function(err){
          res.json(err)
        })
         
      },function(err){
        res.json(err)
      })             
    };
/*Delete User Account Deactivate account*/
router.delete('/:id', DeleteUserAccount);
  function DeleteUserAccount(req, res) {
    var user = req.session.user;
    User.deleteUserById(user._id).then(function(user){
      //console.log("successfully Deleteed:" + user);
      res.format({
        html: function () {
           res.json(user)
        },
        json: function () {
          res.json(movie)
        }
      })
     
    })
  }



router.get('/:id/movie', userActions);
  function userActions(req, res){
    var userId = req.params.id;
    console.log(userId);
    User.movieActionUser(userId).then(function(user){
      res.json(user)
    }, function(err) {
      res.json(err)
    })
      
  }
  // watch movie user
/*router.get('/:id/movie/watch', userWatchMovie);
  function userWatchMovie(userId){
    User.findById(userId)
      .populate('watchMovies')
      .exec(function(err, movie) {
        if(err) {
          console.log(err);
        }
        res.json(movie)
      })
  }*/


router.post('/logout', logout)
    //router.post('/logout', logout)

  function logout(req, res) {
    console.log("logout");
    req.session.destroy();
    res.redirect('/user/login') 
  }

  function loggedin(req, res) {
      res.json(req.session.user);
  }
  

  function findUserById(req,res) {
    console.log("userbyid");

  }

   

  function findLoginUser(req,res) {
    console.log("login");
    var requser = req.body
    User.findUserByCredientials(requser).then(function(user){
      
        console.log("loggedIn as: "+ user);
        res.redirect('../')
      
    }, 
    function(err) {
      console.log(err);
     es.ststus(400).send(err)
    })
  };
  
  

    // working alternative

   /* router.post('/loggn', function(req, res){
      var user = req.body;
      User.userDb.findOne(
        {username: user.username, password: user.password},
        function(err, user){
          if(err) {
            throw err;
          }
          else if(!user){
            console.log("no user found"+ user);
            res.send('no user')
          } else {
            console.log("login as:"+ user);
            res.json(user)
          }
          
        })
    });*/

    // its also a working alternative although mongoose default promise library is deprecated
    
    /* router.post('/loggn', function(req, res){
      var user = req.body;
      User.userDb.findOne(
        {username: user.username, password: user.password})
        .then(function( user){
          
           if(!user){
            console.log("no user found"+ user);
            res.send('no user')
          } else {
            console.log("login as:"+ user);
            res.json(user)
          }
          
        }, function(err) {
          console.log("error");
        })
    })*/

     

    
   /* router.get('/login', function(req, res) {
      res.render('login')
    });*/
 // router.post('/login', loggnll)
    
    /*function loggn(data){
      var deffered = q.defer()
      
      User.userDb.findOne(
        {username: data.username, password: data.password},
        function(err, user){
          if(err) {
            deffered.reject(err)
          }          
          else {
            //console.log("login as:"+ user);
            deffered.resolve(user)
          }
          
        })
        return deffered.promise;        
    }
    function loggnll(req, res) {
      
      var user = req.body;
      loggn(user).then(function(user){
        if (user){
          req.session.user = user;
          var hour = 36000000;
          req.session.cookie.expires = new Date(Date.now() + hour)
          req.session.cookie.maxAge = hour
          res.redirect('profile')
        } else {
          res.json('no user')
        }
      }, function(err){
        res.send('error')
      })
    }*/

module.exports = router;