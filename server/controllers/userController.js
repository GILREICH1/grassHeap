const User = require('../models/User');

async function signUpUser({ userEmail, givenName, familyName }) {
  const newUser = new User({ userEmail, givenName, familyName });
  const savedUser = await newUser.save();
  return savedUser;
}

async function getUser(req, res) {
  const { userEmail } = req.body;

  try {
    let user = await User.findOne({
      userEmail,
    });

    if (!user) {
      user = await signUpUser(req.body);
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send('failed to get user');
  }
}

module.exports = { signUpUser, getUser };
