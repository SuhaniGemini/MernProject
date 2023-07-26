const mongoose = require("mongoose");

const schemaProduct = mongoose.Schema({
    name: {
      type : String,
      required: true
    },
    category: {
      type : String,
      required: true
    },
    dietary: {
      type : String,
      required: true
    },
    image: {
      type : String,
      required: true
    },
    price: {
      type : String,
      required: true
    },
    description: {
      type : String,
      required: true
    },
  });
  const productModel = mongoose.model("product", schemaProduct);

  module.exports = productModel;