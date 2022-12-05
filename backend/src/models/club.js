const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClubSchema = new Schema({    
    name: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: String, required: true},
    hour: {type: String, required: true},
    description: {type: String, required: true},  
});

module.exports = mongoose.model('Club', ClubSchema);

