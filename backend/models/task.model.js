/* KEPT FOR SAFE KEEPING - MERGED IT IN MODELS DUE TO SMALL SIZE.. */

var mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema(
  {
    username: {type: String, required: true},
    delegatedTo: {type: String},
    delegatedBy: {type: String},
    task: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    initEdit: {type: Boolean, default: false}
  }
)

module.exports = mongoose.model('Task', TaskSchema)