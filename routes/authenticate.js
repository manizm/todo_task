var express = require('express')
var router = express.Router()

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null})
	})

	//sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Invalid username or password"})
	})

  // sends successfully changed password state back to angular
  router.get('/reset/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null, message: "Successfully changed password"})
  })
  
  // sends failure change password state back to angular
  router.get('/reset/failure', function(req, res) {
    res.send({state: 'failure', user: null, message: "Username maybe incorrect!"})
  })

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}))

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}))

  // reset password
  router.post('/resetpassword', passport.authenticate('reset', {
    successRedirect: '/auth/reset/success',
    failureRedirect: '/auth/reset/failure'
  }))

	//log out
	router.get('/signout', function(req, res) {
		req.logout()
		res.redirect('/')
	})

	return router;

}