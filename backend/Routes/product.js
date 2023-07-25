const express = require("express");
const router = express.Router();
const {product,uploadProduct} = require("../controllers/product.js");

router.get("/product", product);
router.post("/uploadProduct", uploadProduct);

module.exports = router;
