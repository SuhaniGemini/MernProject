const express = require("express");
const router = express.Router();

const {addtocart,getCartItems, deleteCartItems, increaseQuantity, decreaseQuantity, deleteWholeCart}= require("../controllers/cart.js");

router.post("/addtocart", addtocart);
router.get("/cart/:id",getCartItems);
router.delete("/cartdelete/:id", deleteCartItems);
router.put("/cartinc/:id", increaseQuantity);
router.put("/cartdec/:id", decreaseQuantity);
router.delete("/deletewholecart", deleteWholeCart)

module.exports = router;

