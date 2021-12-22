const User = require('../models/User');

/* USER : {
    userEmail: string,
    plants: MyPlant[],
    tasks: tasks[],
  }
*/

async function signUpUser(userEmail) {
  const newUser = new User({ userEmail });
  const savedUser = await newUser.save();
  return savedUser;
}

async function getUser(req, res) {
  const { userEmail } = req.body;
  console.log(userEmail);
  try {
    let user = await User.findOne({
      userEmail,
    });

    console.log('initial user', user);
    if (!user) {
      user = await signUpUser(userEmail);
      console.log('signed up new user', user);
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send('failed to get user');
  }
}

module.exports = { signUpUser, getUser };
