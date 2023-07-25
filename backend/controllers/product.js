const productModel = require("../models/product.js");

const uploadProduct = async (req, res) => {
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.send({ message: "Uploaded" });
  }

  const product =  async (req, res) => {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  }
  module.exports = {product,uploadProduct}