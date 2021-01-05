const mongoose = require ('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    info: String,
    img: String,
    qty: Number


});

const Item = mongoose.model('Item', itemSchema);
module.exports =Item;
