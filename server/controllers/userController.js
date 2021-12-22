const User = require('../models/User');

/* USER : {
    userID: string,
    plants: MyPlant[],
    tasks: tasks[],
  }
*/

async function signUpUser() {
  return 'signed';
}

// TODO get user and return myplants property
async function getUser(_, res) {
  try {
    const plants = await Plant.find();

    res.status(200).send(plants);
  } catch (err) {
    res.status(400).send('failed to get myPlants');
  }
}

module.exports = { signUpUser, getUser };
