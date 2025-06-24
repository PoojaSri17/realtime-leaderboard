const PlayerScore = require('./PlayerScore');

async function updateScore(playerId, score, region, gameMode) {
  await PlayerScore.deleteMany({ playerId, region, gameMode });

  const entry = new PlayerScore({ playerId, score, region, gameMode });
  await entry.save();
}

async function getTopPlayers(region, gameMode, limit = 10) {
  return await PlayerScore.find({ region, gameMode })
    .sort({ score: -1 })
    .limit(limit)
    .lean();
}

module.exports = {
  updateScore,
  getTopPlayers
};
