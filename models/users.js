const mongoose = require("mongoose");

// Create Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  token: { type: String },
});

module.exports = User = mongoose.model("users", userSchema);
