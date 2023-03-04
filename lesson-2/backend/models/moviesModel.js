const { model, Schema } = require('mongoose');

const moviesSchema = Schema({
  title: {
    required: [true, 'db: Title is required'],
    type: String,
  },
  director: {
    type: String,
    default: 'Quentin Tarantino',
  },
  year: {
    type: Number,
    default: 1990,
  },
  rating: {
    type: Number,
    required: [true, 'db: Rating is required'],
  },
});

module.exports = model('Movies', moviesSchema);
