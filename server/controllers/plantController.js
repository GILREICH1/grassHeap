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

async function deletePlant(req, res) {
  const { plantID, user } = req.body;
  try {
    const deleted = await User.updateOne(
      { userEmail: user.userEmail },
      {
        $pull: {
          userPlants: { plantID: plantID },
        },
      },
    );
    console.log({ deleted });
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
