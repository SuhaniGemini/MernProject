const mongoose = require("mongoose");
const schemacart =  mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    }
  });


  const cartModel = mongoose.model("cart", schemacart);
  module.exports = cartModel;
 //.env fileeee