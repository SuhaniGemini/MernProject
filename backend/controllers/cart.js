const productModel = require("../models/product.js");
const userModel = require("../models/user");
const cartModel = require("../models/cart.js");

const addtocart = async (req, res) => {
  const { id, useremail } = req.body;
  const productDetails = await productModel.findById(id);
  const userDetails = await userModel.findOne({ email: useremail });
  const alreadyExistingProduct = await cartModel.findOne({ product: id });
  if (alreadyExistingProduct) {
    alreadyExistingProduct.set({
      quantity: alreadyExistingProduct.quantity + 1,
    });
    await alreadyExistingProduct.save();
    res.status(200).json("Cart Updated");
  } else {
    cartModel
      .create({
        product: productDetails._id,
        user: userDetails._id,
        quantity: 1,
      })
      .then((ans) => {
        res.status(200).json(ans);
      })
      .catch((err) => {
        throw err;
      });
  }
};

const getCartItems = async (req, res) => {
  const { id } = req.params;
  const userDetails = await cartModel.find({ user: id });
  const products = [];
  for (let i = 0; i < userDetails.length; i++) {
    const product = await productModel.findOne({ _id: userDetails[i].product });
    if (product) {
      products.push({ products: product, quantity: userDetails[i].quantity });
    }
  }

  res.json(products);
};

const deleteCartItems = async (req, res) => {
    const { id } = req.params;
    try {
      await cartModel.deleteOne({ product: id });
      res.status(200).json({ message: 'Cart items deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const increaseQuantity = async (req,res) => {
    const {id} = req.params;
    const product = await cartModel.findOne({product : id});
    product.set({
        quantity : product.quantity+1
    })
    await product.save();
    res.json(product.quantity);
  }

  const decreaseQuantity = async (req,res) => {
    const {id} = req.params;
    const product = await cartModel.findOne({product : id});
    product.set({
        quantity : product.quantity-1
    })
    await product.save();
    res.json(product.quantity);
  }

  const deleteWholeCart = async (req,res) => {
    try{
        await cartModel.deleteMany();
    }
    catch(err){
        console.log(err);
    }
  }
  

module.exports = { addtocart, getCartItems, deleteCartItems, increaseQuantity, decreaseQuantity, deleteWholeCart};
