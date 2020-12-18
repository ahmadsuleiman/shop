const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;

let tshirt = new schema({
    TshirtName : String,
    TshirtPrice : Number,
    NumberOfAvailableItems:Number,
    TshirtCategoryID : {type:objectId,ref:'Category'}
});

module.exports = mongoose.model("Tshirt",tshirt);