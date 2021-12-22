const Plant = require('../models/Plant');

// TODO get user and return myplants property
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
  try {
    const newPlant = new Plant(req.body);
    await newPlant.save();
    res.status(201).send(newPlant);
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
