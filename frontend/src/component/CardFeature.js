import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { addCartItem,} from "../redux/productSlide";
import axios from "axios";
import { toast } from "react-hot-toast";
const CardFeature = ({
  image,
  name,
  price,
  category,
  dietary,
  loading,
  id,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleAddCartProduct = async (e) => {
    if (userData.email === "") {
      toast("Please Login First");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post("/addtocart", {
        id,
        useremail: userData.email,
      });
      if (response.status === 200) {
        toast("Item added successfully");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        dietary: dietary,
        image: image,
      })
    );
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            className="no-underline"
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap text-decoration-none overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500 text-decoration-none">₹</span>
              <span className="no-underline">{price}</span>
            </p>
          </Link>
          <button
            className="bg-yellow-500 py-1 mt-2  drop-shadow-2xl rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add To Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
