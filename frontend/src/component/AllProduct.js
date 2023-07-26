import { AiOutlineSearch } from "react-icons/ai";
import React, { useEffect, useState,useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature"; 
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const inputRef = useRef(null)
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  const [filterby, setFilterBy] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Step 1: Search input state
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  const handleSearchIconClick = () => {
    inputRef.current.focus(); // Focus the input field when the icon is clicked
  };
  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const handleSearchInput = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = productData.filter(
      (el) =>
        ((el?.dietary?.toLowerCase().includes(searchValue?.toLowerCase())) || (el?.name?.toLowerCase().includes(searchValue?.toLowerCase()))) &&
        (!filterby || el.category.toLowerCase() === filterby.toLowerCase())
    );
    setDataFilter(filteredData);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4 flex gap-4 justify-center overflow-scroll scrollbar-none">{heading}</h2>
          <div className="relative flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md mb-4 pl-10 text-gray-600 w-[50%]"
          value={searchInput}
          onChange={(e) => handleSearchInput(e.target.value)}
          ref={inputRef} // Set the ref for the input field
        />
        <AiOutlineSearch
          className="text-base absolute top-[28%] left-[73%] transform translate-y-[-35%] text-grey-500 b cursor-pointer font-bold border-blue-300"
          onClick={handleSearchIconClick} // Call the function when the icon is clicked
        />
      </div>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el?.toLowerCase() === filterby?.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0] ? (
          dataFilter.map((el) => {
            return (
              <CardFeature
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                category={el.category}
                // dietary={el.dietary}
                price={el.price}
              />
            );
          })
        ) : (
          loadingArrayFeature.map((el, index) => (
            <CardFeature loading="Loading..." key={index + "allProduct"} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;