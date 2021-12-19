const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD;

function makeConnectionURI() {
  const IS_TEST = process.env.NODE_ENV === 'test';
  const DB_NAME = IS_TEST ? process.env.DATABASE_TEST : process.env.DATABASE;

  if (!DB_HOST || !DB_USER || !DB_USER_PASSWORD || IS_TEST) {
    return `mongodb://localhost:27017/${DB_NAME}`;
  }

  return `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
}

const connectionURI = makeConnectionURI();

const mongoose = require('mongoose');

mongoose
  .connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to DB'))
  .catch(reason => console.log('Failed to connect to DB', reason));

const db = mongoose.connection;

module.exports = db;
