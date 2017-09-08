var mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }
  }
)


const TaskSchema = new mongoose.Schema(
  {
    username: {type: String, required: true},
    delegatedTo: {type: String},
    delegatedBy: {type: String},
    task: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    initEdit: {type: Boolean, default: false}
  }
)


TaskSchema.methods.getUsers = function () {
  const query = this.model.find({}).select({username: 1})
  return query
}

module.exports = mongoose.model('Task', TaskSchema)

module.exports = mongoose.model('User', UserSchema)