const { model, Schema } = require('mongoose');

const roleSchema = Schema({
  value: {
    type: String,
    unique: true,
    default: 'USER',
  },
});

module.exports = model('Role', roleSchema);
