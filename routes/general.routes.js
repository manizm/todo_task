/* NOT USED - PLEASE IGNORE - KEPT FOR SAFE KEEPING */

var express = require('express')
var router = express.Router()

module.exports = function(passport){

  function isAuthenticated(req, res, next) {
    
    // allow all get requests
    // if (req.method === 'GET')
    //     return next()
  
    // if user is authenticated, call next
    if (req.isAuthenticated()){
      console.log('isAuthenticated')
      return next()
    }
  
    // otehrwise redirect to login page
    // !!!!!!!!!!!!CHECK REDIRECT ROUTE!!!!!!!!!!!!!!
    return res.redirect('/')
  }

  router.use('/', isAuthenticated)
	router.get('/todos', function(req, res) {
    // console.log(res)
		res.redirect('back')
	})

	return router;

}