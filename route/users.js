var mongoose = require('mongoose');
var express = require('express');
  
//var User = require('../model/user.model')( mongoose);
//var Movie = require('../model/movie.model')( mongoose);
var q = require('q') // included only for expariments
var Movie = require('../model/index.model').movie
var User = require('../model/index.model').user
var router = express.Router();
  router.use(function(req, res, next) {
      var xxx =res.locals.user = req.session.user || {};
        next()
    })

  router.get('/', findUser);
    function findUser(req, res) {
      User.findAll().then( function(user){
        res.json(user)
      }, function(err) {
        res.status(400).send(err)
      })
    }
    //app.get('/user', createAll)
    //router.post('/login',findLUser /*findLoginUser*/)
    router.get('/register', renderRegister);
    router.post('/register', createAll);
    function renderRegister(req, res) {
      res.render('register')
    };

    function createAll(req, res) {
      //console.log("post Register");
      var user = req.body
      User.createUser(user).then( function(user){
        //console.log("creating a user:"+ user);
        res.redirect('/user')
      }, function(err) {
        res.status(400).send(err)
      })
    };

    router.get('/login', function(req, res){
      res.render('login')
    });
    router.post('/login', loggnll)
    
    function loggn(data){
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
          //console.log("profile");
          res.redirect('profile')
        } else {
          res.json('no user')
        }
      }, function(err){
        res.send('error')
      })
    }

    router.get('/profile', findUserProfile);
     function findUserProfile(req,res) {

      var userId = req.session.user._id
      var loglogeduser = req.session.user;
      User.findUserById(userId).then(function(user){
        //console.log("profile route: "+user);
        var likeMovies = user.likeMovies;

        var mlu = []
        likeMovies.forEach(function(lm) {
          var movie = lm._id;
          mlu.push(movie)
        })
         //console.log("profile route: "+mlu);
        return Movie.findMovieByIds(mlu).then(function(mov) {
          //console.log("return from voie :"+ mov);
          res.render('profile',{user: loglogeduser, movie: mov,searchUser: user}) 
        },function(err){
          res.json(err)
        })
         
      },function(err){
        res.json(err)
      })   
          
    };
    router.get('/:id', findUserProfileWithID);
     function findUserProfileWithID(req,res) {
      var userId = req.params.id
      var loglogeduser = req.session.user;
      User.findUserById(userId).then(function(user){
        var likeMovies = user.likeMovies;

        var mlu = []
        likeMovies.forEach(function(lm) {
          var movie = lm._id;
          mlu.push(movie)
        })
         //console.log("profile route: "+mlu);
        return Movie.findMovieByIds(mlu).then(function(mov) {
          //console.log("return from voie :"+ mov);
          res.render('profile',{user: loglogeduser, movie: mov, searchUser: user}) 
        },function(err){
          res.json(err)
        })
         
      },function(err){
        res.json(err)
      })   
          
    };

  
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


module.exports = router;