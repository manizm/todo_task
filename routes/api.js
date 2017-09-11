const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Promise = require('bluebird')
      Task = mongoose.model('Task')
      User = mongoose.model('User')

// this middleware is used for routes that must be authenticated
function isAuthenticated(req, res, next) {

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


/* api for all posts */
router.route('/posts')

  /*
    On post request,
    create a new task instance from Task model,
    get the information from the request body,
    store it in task instance
    save it to db
    uses promises
  */
  .post((req, res) => {
    const task = new Task()
    
    task.username = req.body.username
    task.delegatedTo = req.body.delegatedTo
    task.delegatedBy = req.body.delegatedBy 
    task.task = req.body.task
    
    task.save()
    .then(task => res.json(task))
    .catch(err => res.status(500).send(err))
  })


/* get all the tasks related to a particular user */
router.route('/posts/all/:id')

  .get((req, res) => {
    // console.log(req)
    // console.log(req.params.id)
    /*
      Uses bluebird's promise api
      upon get request, create task and user objects
      get information from DB through id parameter passed in get request
      store the result from db in Promise.props object
      it works like es6 promise.all but for object **BOOYAH**
      then pass the result to the client 
      otherwise catch error
    */
    Promise.props(
      {
        task: Task.find({$or:[{username: req.params.id}, {delegatedTo: req.params.id}]}),
        users:  User.find({}).select({"username": 1})
      }
    )  
    .then(tasks => {
      console.log('in posts route for posts/all/:id success', tasks)
      res.status(200).send( tasks)
    })
    .catch(err => {
      console.log('in posts route for posts/all/:id failure')
      res.status(500).send(err)
    })
  })


/* api for specific task */
router.route('/posts/:id')
  
  // get post By id passed in req parametes - simple
  .get((req, res) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => res.json(task))
    .catch(res.send(err))
  })

  //update post
  /* 
    Find post by id
    then update each field of the found task
    then put the task back in db
    otherwise catch errors
  */
  .put((req, res) => {
    Task.findById(req.params.id)
    .exec()
    .then(task => {
      task.username = req.body.username
      task.delegatedTo = req.body.delegatedTo
      task.delegatedBy = req.body.delegatedBy 
      task.task = req.body.task
      task.isCompleted = req.body.isCompleted

      task.save()
      .then(task => res.json(task))
      .catch(err => res.send(err))
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

  /*
    get all usernames
    these usernames are required by todos list in client side
    uses promises
  */
  router.use('/list', isAuthenticated)
  router.route('/list/users')
  
    .get((req, res) => {
      User.find({}).select({"username": 1})
      .exec()
      .then(users => {
        // console.log('in posts routes for /list success', users)
        res.status(200).send(users)
      })
      .catch(err => {
        console.log('in posts route for /list failure', err)
        res.status(500).send(err)
      })
    })
    
module.exports = router