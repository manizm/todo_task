var mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }
    // resetPasswordToken: String,
    // resetPasswordExpires: Date
  }
)



// UserSchema.pre('save', function(next) {
//   let user = this
//       SALT_FACTOR = 10

//   if (!user.isModified('password')) return next()

//   bCrypt.hash(user.password, salt, null)
//     .then(hash => { 
//       user.password = hash 
//       next()
//     })
//     .catch(err => next(err))
// })


module.exports = mongoose.model('User', UserSchema)