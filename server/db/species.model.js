// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const SpeciesSchema = new Schema({
  name: String,
  extinct: Boolean,
  _id: Number,
  parent: Number,
  confidence: String,
  comment: String,
});

module.exports = mongoose.model("Species", SpeciesSchema);
