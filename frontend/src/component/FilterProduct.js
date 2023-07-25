import React from "react";
import { BiFoodMenu } from "react-icons/bi";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-5xl p-4  font-semibold drop-shadow-lg rounded-full cursor-pointer  ${isActive ? "bg-yellow-500 text-white" : "bg-yellow-200"}`}>
 <BiFoodMenu className="font-semibold" />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
