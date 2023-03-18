const { model, Schema } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    default: 'Quentin Tarantino',
  },
  email: {
    type: String,
    required: [true, 'db: Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'db: Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: 'Role',
    },
  ],
});

module.exports = model('User', userSchema);
