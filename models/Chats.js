const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  chat: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
