const mongoose = require('mongoose');

const scoreboardSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    points: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Scoreboard', scoreboardSchema);
