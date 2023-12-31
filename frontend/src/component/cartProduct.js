import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
const CartProduct = ({ id, name, image, category, qty, total, price }) => {
  const deleteCartProduct = async () => {
    try {
      await axios.delete("/cartdelete/" + id);
    } catch (err) {
      console.error("Error deleting cart product:", err);
    }
    window.location.reload();
  };

  const increaseQuantity = async () => {
    try {
      await axios.put("/cartinc/" + id);
    } catch (err) {
      console.error("Error increasing cart quantity:", err);
    }
    window.location.reload();
  };

  const decreaseQuantity = async () => {
      if(qty === 0 ){
      toast ("Quantity Cannot be negative");
      return;
    }
    try {
      await axios.put("/cartdec/" + id);
    } catch (err) {
      console.error("Error decreasing cart quantity:", err);
    }
    window.location.reload();
  };
  return (
    <div className="bg-slate-200 p-2 flex gap-4 mb-3 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden flex items-center">
        <img src={image} className="h-24 w-40 object-cover " />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={deleteCartProduct}
          >
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-slate-500  font-medium ">{category}</p>
        <p className=" font-bold text-base">
          <span className="text-red-500 ">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button
              onClick={increaseQuantity}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbPlus />
            </button>
            <p className="font-semibold p-1">{qty}</p>
            <button
              onClick={decreaseQuantity}
              className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total :</p>
            <p>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartProduct;
