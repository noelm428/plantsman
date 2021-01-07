const mongoose = require ('mongoose');

const plantSchema = new mongoose.Schema({
    name: String,
    info: String,
    care: String,
    img: String,
    qty: Number


});

const Plant = mongoose.model('green', plantSchema);
module.exports =Plant;
