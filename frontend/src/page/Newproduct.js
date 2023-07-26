import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    dietary: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    dietary: "",
    description: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [name]: "",
      };
    });
  };
  const isImageFile = (file) => {
    return file && file.type.startsWith("image/");
  };
  const uploadImage = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && isImageFile(selectedFile)) {
      const data = await ImagetoBase64(selectedFile);
      setData((prev) => ({
        ...prev,
        image: data,
      }));
    } else {
      toast.error("Please select a valid image file.");
      setData((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, dietary, price, description } = data;
    const newErrors = {};

    // Basic form validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!category.trim() || category === "other") {
      newErrors.category = "Please select a valid category";
    }

    if (!image) {
      newErrors.image = "Please upload an image";
    }

    if (!price.trim() || isNaN(price)) {
      newErrors.price = "Please enter a valid price";
    }

    if (!dietary.trim()) {
      newErrors.dietary = "Dietary information is required";
    }

    if(!description.trim()){
      newErrors.description = "Description is required"
    }

    if (Object.keys(newErrors).length > 0) {
      // There are errors, update the state to show the error messages
      setErrors(newErrors);
      return;
    }

    // If there are no errors, proceed with form submission
    const fetchData = await fetch("http://localhost:8080/uploadProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const fetchRes = await fetchData.json();

    toast(fetchRes.message);

    setData(() => {
      return {
        name: "",
        category: "",
        image: "",
        price: "",
        dietary: "",
        description: "",
      };
    });

    setErrors({});
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value="other">Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Chinese">Chinese</option>
          <option value="South Indian">Meal</option>
          <option value="North Indian">North Indian</option>
          <option value="Biryani">Biryani</option>
          <option value="Pizza">Pizza</option>
          <option value="Cake">Cake</option>
          <option value="Burger">Burger</option>
          <option value="Deserts">Deserts</option>
          <option value="Icecream">Icecream</option>
        </select>
        {errors.category && (
          <span className="text-red-500">{errors.category}</span>
        )}

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        {errors.image && <span className="text-red-500">{errors.image}</span>}

        <label htmlFor="dietary">Diet</label>
        <input
          type="text"
          name="dietary"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.dietary}
        />
        {errors.dietary && (
          <span className="text-red-500">{errors.dietary}</span>
        )}

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />
        {errors.price && <span className="text-red-500">{errors.price}</span>}

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>
        {errors.description && <span className="text-red-500">{errors.description}</span>}
        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
