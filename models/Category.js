const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, "Category must have a name"]
  },
  slug: {
    name: String,
    required: [true, "Category Slug Required"]
  },
  link: {
    type: Schema.Types.ObjectId,
    ref: "Link"
  }
});
