import React, { useState } from "react";
import loginSignupImage from "../assest/Profile.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Implement your password validation logic here, e.g. minimum length requirements
    return password.length >= 6;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));    
  };

  const isImageFile = (file) => {
    return file && file.type.startsWith("image/");
  };

  const handleUploadProfileImage = async (e) => {
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
    const { firstName, lastName, email, password, confirmPassword, image } = data;
    let formIsValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    

    if (!firstName) {
      newErrors.firstName = "First name is required";
      formIsValid = false;
    } else {
      const nameregex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
      if (!nameregex.test(firstName)) {
        newErrors.firstName = "First name is not valid";
        formIsValid = false;
      }
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required";
      formIsValid = false;
    } else {
      const nameregex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
      if (!nameregex.test(lastName)) {
        newErrors.lastName = "Last name is not valid";
        formIsValid = false;
      }
    }

    if (!email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters long";
      formIsValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      formIsValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      formIsValid = false;
    }

   

    setErrors(newErrors);

    if (formIsValid) {
      if(!image){
        alert("Image is required");
        return;
      }
      const fetchData = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataRes = await fetchData.json();
      toast("Registered Successfully");
      console.log(dataRes);
      if (dataRes === "User Registered") {
        navigate("/login");
      }
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-4">Sign up</h1>

        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image : loginSignupImage} alt="Profile" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-blue-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-gray-100 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            value={data.firstName}
            onChange={handleOnChange}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}

          <label htmlFor="lastName" className="text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-gray-100 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            value={data.lastName}
            onChange={handleOnChange}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}

          <label htmlFor="email" className="text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-gray-100 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            value={data.email}
            onChange={handleOnChange}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          <label htmlFor="password" className="text-gray-700 mb-1">
            Password
          </label>
          <div className="flex px-4 py-2 bg-gray-100 rounded mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-gray-100 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}

          <label htmlFor="confirmPassword" className="text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="flex px-4 py-2 bg-gray-100 rounded mt-1 mb-2 focus:outline-none focus:ring focus:border-blue-500">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="w-full bg-gray-100 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword}
            </span>
          )}

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-2 mt-4">
            Sign up
          </button>
        </form>

        <span className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
