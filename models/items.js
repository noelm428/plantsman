const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  item:{ type :String, required:true},
  info:{type:String, required:true},
  img:{type:String, required:true},
  qty:Number


});

const Item =mongoose.model('Item', itemSchema);

module.exports = Item;
