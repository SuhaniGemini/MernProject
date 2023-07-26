import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import axios from "axios";
import { toast } from "react-hot-toast";

const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const productData = useSelector((state) => state.product.productList);

  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  const userData = useSelector((state) => state.user);
  const handleAddCartProduct = async (e) => {
    if (userData.email === "") {
      toast("Please Login first");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/addtocart", {
        id: productDisplay._id,
        useremail: userData.email,
      });
      if (response.status === 200) {
        toast("Item added successfully");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };


  return (
    <div className="p-2 md:p-4">
      <div className="w- max-w-4xl mt-4 m-auto md:flex bg-white">
        <div className="max-w-xs  overflow-hidden w-full p-5 ">
          <img
            src={productDisplay?.image}
            className="hover:scale-105 transition-all h-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-slate-600 mt-3 mb-1 capitalize text-2xl md:text-4xl">
            {productDisplay?.name}
          </h3>
          <p className=" text-slate-500  mb-1 font-serif font-bold text-2xl">{productDisplay?.category}</p>
          <p className=" text-slate-500 mb-1  font-serif font-light text-xl">{productDisplay?.dietary}</p>
          <p className=" font-bold md:text-2xl">
            <span className="text-red-500  ">₹</span>
            <span>{productDisplay?.price}</span>
          </p>
        
          <div>
            <span className="text-slate-600 font-medium mb-3">Description </span>
            <p className="font-serif">{productDisplay?.description}</p>
          </div>
          <div>
            <p className="text-slate-600 mb-2 font-medium">Dietary : <p className="font-serif">{productDisplay?.dietary}</p></p>
            <div className="flex gap-3">
          <button onClick={handleAddCartProduct} className="bg-yellow-500 py-1 mt-2 mb-4 rounded hover:bg-yellow-600 min-w-[100px]">Add To Cart</button>
          </div>
          </div>
        </div>
      </div>
      {/* <Search/> */}
      {/* <AllProduct heading={"Related Product"}/> */}
    </div>
  );
};

export default Menu;