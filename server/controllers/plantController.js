const Plant = require('../models/Plant');
const User = require('../models/User');

// TODO remove this
async function getMyPlants(_, res) {
  try {
    const plants = await Plant.find();

    res.status(200).send(plants);
  } catch (err) {
    res.status(400).send('failed to get myPlants');
  }
}

// TODO save to myplants property of User
async function savePlant(req, res) {
  const { plant, user } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { userEmail: user.userEmail },
      { $push: { userPlants: plant } },
      { new: true },
    );

    console.log({ updatedUser });
    res.status(201).send(updatedUser);
  } catch (err) {
    res.status(400).send('failed to save');
  }
}

// TODO remove from myplants property of User
async function deletePlant(req, res) {
  const { plantID } = req.body;
  try {
    const deleted = await Plant.deleteOne({
      plantID,
    });
    res.status(202).send(deleted);
  } catch (err) {
    res.status(400).send('failed to delete');
  }
}

module.exports = {
  getMyPlants,
  savePlant,
  deletePlant,
};
