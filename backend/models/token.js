const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },//for checking if the existing token is valid when login
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'Profile',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('token', tokenSchema);
