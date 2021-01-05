const mongoose = require ('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    info: String,
    img: String,
    qty: Number


});

const Item = mongoose.model('Inventory', itemSchema);
module.exports =Item;
