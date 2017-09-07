const mongoose = require('mongoose')
const User = require('./backend/models/models')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt-nodejs')


module.exports = function (passport) {
  

  /* serialize and desiralize users for persistant login sessions */
  passport.serializeUser((user, done) => {
    console.log(`serializing user: ${user.username}`)
    // return the unique id for the user
    done(null, user._id)
  })

  
  /* desirialize user will use unique id from serializeUser */
  passport.deserializeUser((username, done) => {
    User.findById(id)
    .exec()
    .then(user => {
      console.log('Deserializing user: ', user.username)
      done(null, user)
    })
    .catch(err => done(err))
  })


  /* setup login local strategy */
  passport.use('login', new LocalStrategy(

    // callback
    (req, username, password, done) => {

      User.findOne({'username' : username})
        .exec()
        .then(user => {
          // if username does not exist
          if (!user) {
            console.log(`user not found with username ${username}`)
            done(`user not found with username ${username}`, false)
          }

          // if wrong password
          if(!isValidPassword(user, password)) {
            console.log('Invalid Password!')
            done('Invalid Password', false)
          }
          
          // othweise username and password is correct! /* ADD RETURN IF IT DOESNT WORK */
          done(null, user)
        })
        .catch(err => done(err))
    }
  ))

  
  /* setup signup local strategry */
  passport.use('signup', new LocalStrategy(

    (req, username, password, done) => {
        
      User.findOne({'username': username})
      .then(user => {
        // if user already exists
        if(user) {
          console.log(`User already exists with username: ${username}`)
          done(null, false)
        }
        else {
          createUser(username, password, done)
        }
      })
    }
  ))


  /* setup forgot Password local strategry */
  passport.use('forgotPassword', new LocalStrategy(

    (req, username, password, done) => {
        
      console.log('request in signup is: ', req)

      User.findOne({'username': username})
      .exec()
      .then(user => {
        // if username does not exist
        if (!user) {
          console.log(`user not found with username ${username}`)
          done(`user not found with username ${username}`, false)
        }
        else {
          createPassword(user, password, done)
        }
      })

    }
  ))

  /* utility functions */
  
  const createUser = (username, password) => {
    // if there is no user, create a new one
    const newUser = new User()

    // set the user's local credentials
    newUser.username = username
    newUser.password = createHash(password)

    // save the user
    newUser.save(err => {
      if(err) {
        console.log(`Error in saving user: ${err}`)
        // throw err
      }
      console.log(`${newUser.username} Registration successful!`)
      done(null, newUser)
    })
  }


  const createPassword = (user, password, done) => {
    user.password = createHash(password)
    User.save(err => {
      if (err) {
        console.log(`Error in resetting the password: ${err}`)
        // throw err
      }

      console.log(`Password reset successful!`)
      return done(null, User)
    })
    // othweise username and password is correct!
    return done(null, user)
  }


  const isValidPassword = (user, password) => {
    bCrypt.compareSync(password, user.password)
  }

  const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
  }
}