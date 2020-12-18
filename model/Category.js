const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;

let category = new schema({
    CategoryName : String,
});

module.exports = mongoose.model("Category",category);