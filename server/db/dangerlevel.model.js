const mongoose = require("mongoose");

const dangerListLevelSchema = new mongoose.Schema({
  name: String,
  level: Number,
});

module.exports = mongoose.model("dangerLevel", dangerListLevelSchema);
