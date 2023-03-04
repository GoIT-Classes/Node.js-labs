const mongoose = require('mongoose');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log(
      `MongoDB is connected, dbName: ${db.connection.name}, on port: ${db.connection.port}, on host: ${db.connection.host}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.italic.bold);
    process.exit(1);
  }
}

module.exports = connectDB;
