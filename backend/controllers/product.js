const productModel = require("../models/product.js");

const uploadProduct = async (req, res) => {
  try {
    const data = await productModel(req.body);
    const datasave = await data.save();
    res.send({ message: "Uploaded" });
  } catch (err) {
    console.error("Error uploading product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const product = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { product, uploadProduct };
