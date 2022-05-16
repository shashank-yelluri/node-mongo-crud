var mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
