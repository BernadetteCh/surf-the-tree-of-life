const mongoose = require("mongoose");

const { Schema } = mongoose;
const PostSchema = new Schema({
  name: String,
  extinct: Boolean,
  _id: Number,
  parent: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Species" }],
  confidence: String,
});

module.exports = mongoose.model("Reference", PostSchema);
