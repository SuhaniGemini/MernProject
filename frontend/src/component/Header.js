import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import logo from "../assest/Name.png";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const Navigate = useNavigate();
  console.log(userData);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout successfully");
    Navigate("/");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-black">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
        <div className="h-12 w-18">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex ">
            <Link to={""} className="text-white no-underline">
              Home
            </Link>
            {/* <Link to={"menu/63f0fdbb3bcc2f97fa53d25d"}>Menu</Link> */}
            <Link to={"about"} className="text-white no-underline">
              About
            </Link>
            <Link to={"contact"} className="text-white no-underline">
              Contact
            </Link>
            
          </nav>
          {(userData.email !== "" && userData.email !== "pachourisuhani@gmail.com") && (
            <div className="text-2xl text-slate-600 relative">
              <Link to={"cart"} className="text-slate-400">
                <BsCartFill />
                <div className="absolute -top-1 -right-1 text-black bg-gray-300 h-4 w-4 rounded-full m-0 p-0 text-sm flex items-center justify-center ">
                  {cartItemNumber.length}
                </div>
              </Link>
            </div>
          )}
          <div className=" text-slate-400" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full " />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2  bg-slate-300 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === "pachourisuhani@gmail.com" && (
                  <Link
                    to={"newproduct"}
                    className=" text-black no-underline  cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    className="cursor-pointer no-underline first-letter text-black px-2 py-1 "
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap no-underline cursor-pointer px-2 text-black"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden ">
                  <Link to={""} className="px-2 py-1 cursor-pointer text-black no-underline ">
                    Home
                  </Link>
                  <Link to={"about"} className="px-2 py-1 cursor-pointer text-black no-underline ]">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1 cursor-pointer text-black no-underline ">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
