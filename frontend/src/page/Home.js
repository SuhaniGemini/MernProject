import React from "react";
import { useSelector } from "react-redux";
import AllProduct from "../component/AllProduct";
import Carousels from "../component/Carousel";
const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const userData = useSelector((state) => state);
  return (
    <>
    <div className="p-2 md:p-4">
    <div className="flex justify-center">
    <Carousels/>
    </div>
    <br></br>
      <AllProduct heading= {"Your Product"}/> 
    </div>
    
    </>
  );
};
export default Home;
