const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Task = require('../backend/models/task.model')

// this middleware is used for routes that must be authenticated
function isAuthenticated(req, res, next) {
  
  // allow all get requests
  // if (req.method === 'GET')
  //     return next()

  // if user is authenticated, call next
  if (req.isAuthenticated())
    return next()

  // otehrwise redirect to login page
  // !!!!!!!!!!!!CHECK REDIRECT ROUTE!!!!!!!!!!!!!!
  return res.redirect('/login')
}

// register the authenticate middleware
router.use('/posts', isAuthenticated)

// api for all posts

router.route('/posts')

  .post((req, res) => {
    const task = new Task()
    
    task.username = req.body.username
    task.delegatedTo = req.body.delegatedTo
    task.delegatedBy = req.body.delegatedBy 
    task.task = req.body.task
    
    task.save((err, task) => {
      if (err) return res.send(500, err)

      return res.json(task)
    })
  })

  .get((req, res) => {
    Task.find()
    .exec()
    .then(tasks => res.send(tasks))
    .catch(err => res.send(500, err))
  })

// api for specific post
router.route('/posts/:id')
  
  // get post
  .get((req, res) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => res.json(task))
    .catch(err => res.send(err))
  })

  //update post
  .put((req, res) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => {
      task.username = req.body.username
      task.delegatedTo = req.body.delegatedTo
      task.delegatedBy = req.body.delegatedBy 
      task.task = req.body.task

      task.save((err, task) => {
        if (err) res.send(err)
        
          res.json(task)
      })
    })
    .catch(err => res.send(err))
  })

  // delete post
  .delete((req, res) => {
    Task.remove({_id: req.params.id})
    .exec()
    .then(result => res.json('deleted'))
    .catch(err => res.send(err))
  })

module.exports = router