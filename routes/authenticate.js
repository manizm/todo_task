const express = require('express')
const router = express.Router()

module.exports = (passport) => {

  // sends successful login state back to angular
  router.get('/success', (req, res) => {
    res.send({state: 'success', user: req.user ? req.user : null})
  })

  // sends failiure login state back to angular
  router.get('/failure', (req, res) => {
    res.send({state: 'failure', user: null, message: "Invalid username or password"})
  })

  
  // sends login info to passport's handlers
  // redirects to correct endpoint by using routers above
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }))

  // sends signup info to passport's handlers
  // redirects to correct endpoint by using routers above
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }))

  // sends forgotPassword info to passport's handlers
  // redirects to correct endpoint by using routers above
  router.post('/forgotPassword', passport.authenticate('forgotPassword', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }))

  // uses middleware added by passport's library
  // logsout a user
  router.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}