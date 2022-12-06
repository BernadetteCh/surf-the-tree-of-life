const mongoose = require("mongoose");

const { Schema } = mongoose;

const formSchema = new Schema({
  name: String,
  option: String,
  date: String,
  description: String,
  dangerLevel: String,
});

module.exports = mongoose.model("FormInput", formSchema);
