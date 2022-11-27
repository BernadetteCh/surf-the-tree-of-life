const mongoose = require("mongoose");

const { Schema } = mongoose;

const formSchema = new Schema({
  name: String,
  option: String,
  date: String,
  description: String,
});

module.exports = mongoose.model("FormInput", formSchema);
