const mongoose = require ('mongoose');

const plantSchema = new mongoose.Schema({
    name: String,
    info: String,
    img: String,
    qty: Number


});

const Plant = mongoose.model('Inventory', plantSchema);
module.exports =Plant;
