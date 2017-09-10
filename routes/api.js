const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Promise = require('bluebird')
      Task = mongoose.model('Task')
      User = mongoose.model('User')

// this middleware is used for routes that must be authenticated
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
    
    task.save()
    .exec()
    .then(task => res.json(task))
    .catch(res.send(500, err))
  })

// get all the tasks related to a particular user
router.route('/posts/all/:id')
  .get((req, res) => {
    console.log(req)
    console.log(req.params.id)
    Promise.props(
      {
        task: Task.find({$or:[{username: req.params.id}, {delegatedTo: req.params.id}]}),
        users:  User.find({}).select({"username": 1})
      }
    )  
    .then(tasks => {
      console.log('in posts route success', tasks)
      res.status(200).send( tasks)
    })
    .catch(err => {
      console.log('in posts route error')
      res.status(500).send(err)
    })
  })

// api for specific task
router.route('/posts/:id')
  
  // get post
  .get((req, res) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => res.json(task))
    .catch(res.send(err))
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
      task.isCompleted = req.body.isCompleted

      task.save((err, task) => {
        if (err) {res.send(err)}
        
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

  // get all usernames
  router.use('/list', isAuthenticated)
  router.route('/list/users')
    .get((req, res) => {
      User.find({}).select({"username": 1})
      .exec()
      .then(users => {
        console.log('in posts route success', users)
        res.status(200).send(users)
      })
      .catch(err => {
        console.log('in posts route success', err)
        res.status(500).send(err)
      })
    })
module.exports = router