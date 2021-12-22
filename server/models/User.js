const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userEmail: String,
  givenName: String,
  familyName: String,
  userPlants: {
    type: Array,
    default: [],
  },
  userTasks: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
