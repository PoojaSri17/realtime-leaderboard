const mongoose = require('mongoose');

const playerScoreSchema = new mongoose.Schema({
  playerId: String,
  score: Number,
  region: String,
  gameMode: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // TTL = 1 day
  }
});

playerScoreSchema.index({ region: 1, gameMode: 1, score: -1 });

module.exports = mongoose.model('PlayerScore', playerScoreSchema);
