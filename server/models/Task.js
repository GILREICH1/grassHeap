const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  month: String,
  crop: String,
  task: String,
  _id: String,
  userCreated: Boolean,
});

const Task = mongoose.model('task', taskSchema);

module.exports = { Task, taskSchema };
