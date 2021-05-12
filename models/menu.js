const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: Object, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Menu", menuSchema);
