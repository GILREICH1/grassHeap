const mongoose = require('mongoose');
const { plantSchema } = require('./Plant.js');
const { taskSchema } = require('./Task.js');

const userSchema = new mongoose.Schema({
  userEmail: String,
  givenName: String,
  familyName: String,
  userPlants: [plantSchema],
  userTasks: [taskSchema],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
