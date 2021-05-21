const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  title: String,
  link: String,
  url: String,
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

module.exports = mongoose.model("Link", LinkSchema);
