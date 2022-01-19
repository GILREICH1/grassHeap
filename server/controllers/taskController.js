const { Task } = require('../models/Task');
const User = require('../models/User');

async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send('failed to get');
  }
}

async function saveTask(req, res) {
  const { task, user } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userEmail: user.userEmail },
      { $push: { userTasks: task } },
      { new: true },
    );
    res.status(201).send(updatedUser);
  } catch (err) {
    res.status(400).send('failed to save');
  }
}

// TODO delete tasks of User
async function deleteTask(req, res) {
  const { _id } = req.body;
  try {
    const response = await Task.findByIdAndDelete({ _id });
    res.status(201).send(response);
  } catch (err) {
    res.status(400).send('failed to delete');
  }
}

async function getTasksByMonth(req, res) {
  let month = req.params.month;
  month = month[0].toUpperCase() + month.slice(1).toLowerCase();
  try {
    const tasks = await Task.find({
      month,
    });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send('failed to get');
  }
}

async function getTasksByCrop(req, res) {
  const crop = req.params.crop;
  try {
    const tasks = await Task.find({
      crop,
    });
    res.status(200).send(tasks);
  } catch (err) {
    res.status(400).send('failed to get');
  }
}

module.exports = {
  deleteTask,
  getTasksByCrop,
  getTasks,
  saveTask,
  getTasksByMonth,
};
