const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchSchema = new Schema({
    user: {type: String, required: true},
    image: {type: String, required: true},
    date: {type: String, required: true},
    club: {type: String, required: true},
    mode: {type: String, required: true},
    players: {type: Number, required: true},
    vacants: { type: Array, default: [] },
    genre: {type: String, required: true},
    complete: {type: Boolean, required: true}
});

module.exports = mongoose.model('Match', MatchSchema);

