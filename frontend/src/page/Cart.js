import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [productCartItem, setProductCartItem] = useState([]);
  const userData = useSelector((state) => state.user);
  useEffect(() => {
    try{
      axios.get("/cart/" + userData._id).then((response) => {
        setProductCartItem(response.data);
      });
    } catch(err){
      console.log(err);
    }
  }, []);

  const deleteCart = async ()=>{
    toast("Order Successful");
    axios.delete("/deletewholecart");
    setProductCartItem([]);
  }
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.products.price * curr.quantity),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.quantity),
    0
  );
  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>
        {productCartItem[0] ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el.products._id}
                    id={el.products._id}
                    name={el.products.name}
                    image={el.products.image}
                    category={el.products.category}
                    qty={el.quantity}
                    total={el.quantity * el.products.price}
                    price={el.products.price}
                  />
                );
              })}
            </div>
            {/* total cart item  */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-400 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32">
                  <span className="text-red-300">₹</span> {totalPrice}
                </p>
              </div>
              <button className="bg-red-500 w-full text-lg font-semibold py-2 text-white" onClick={deleteCart}>
              Checkout
            </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex  w-full justify-center font-bold text-slate-400 items-center flex-col mt-14 text-3xl underline">
              Your Cart is empty
            </div>
            <div className="flex  w-full justify-center font-bold text-slate-400 items-center flex-col mt-14 text-2xl ">
              Please Add Items.
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
