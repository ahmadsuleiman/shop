const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;

let order = new schema({
    OrderNumber : Number,
    TshirtID : {type:objectId,ref:'Tshirt'},
    OrderDateTime:Date,
    CustomerPhoneNumber:String
});
module.exports = mongoose.model("Order",order);