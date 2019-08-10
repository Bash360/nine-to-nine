const mongoose = require('mongoose');
async function connectDatabase() {
  await mongoose
    .connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('successfully connected to database');
    })
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
}
async function disconnectDatabase() {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  console.log('connection closed');
}
module.exports = { connectDatabase, disconnectDatabase };
