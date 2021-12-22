const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userID: String,
  userEmail: String,
  userPlants: Array,
  userTasks: Array,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
