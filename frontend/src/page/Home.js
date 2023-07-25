import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { GrPrevious, GrNext } from "react-icons/gr";
// import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";
import Carousels from "../component/Carousel";
const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);
  const userData = useSelector((state) => state);
  console.log(userData);
  // const homeProductCartList = productData.slice(1, 5);
  // const loadingArray = new Array(4).fill(null);
  // const loadingArrayFeature = new Array(10).fill(null);
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
