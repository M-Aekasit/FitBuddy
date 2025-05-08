const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false }, // NEW FIELD
  verificationToken: String, // For email confirmation
});

module.exports = mongoose.model('User', userSchema);
