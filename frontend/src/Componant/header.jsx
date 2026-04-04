import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdShoppingCart, MdOutlineDarkMode, MdLightMode } from "react-icons/md";

function Header({ cart, dark, setDark }) {
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full h-16 px-3 sm:px-6 shadow-md bg-white">
        <nav className="flex justify-between items-center h-full">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            {location.pathname !== "/" && (
              <button onClick={() => navigate(-1)} className="sm:hidden">
                <FaLongArrowAltLeft size={20} />
              </button>
            )}

            <img
              src="logo.png"
              alt="logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain drop-shadow-md"

            />
          </div>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex flex-1 justify-center">
            <form onSubmit={handleSubmit} className="relative w-1/2">
              <IoIosSearch className="absolute left-3 top-3 text-xl" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 h-10 border rounded-md bg-gray-100 outline-none"
              />
            </form>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-5">

            {/* DARK MODE */}
            <div
              onClick={() => setDark(!dark)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition
              ${dark ? "bg-gray-800" : "bg-gray-400"}`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full flex items-center justify-center transform transition
                ${dark ? "translate-x-7" : "translate-x-0"}`}
              >
                {dark ? (
                  <MdLightMode size={12} className="text-yellow-400" />
                ) : (
                  <MdOutlineDarkMode size={12} className="text-orange-400" />
                )}
              </div>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden sm:flex items-center gap-5">
              <Link to="/" className="hover:text-green-600 font-semibold">Home</Link>
              <Link to="/product" className="hover:text-green-600 font-semibold">Product</Link>

              <Link to="/login">
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Login
                </button>
              </Link>
            </div>

            {/* CART */}
            <Link to="/cart" className="relative">
              <MdShoppingCart className="text-2xl sm:text-3xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[2px] rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(!isOpen)}
              className="sm:hidden text-2xl"
            >
              <RxHamburgerMenu />
            </button>

          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="sm:hidden bg-gray-100 px-4 py-3 space-y-3 shadow-md">
          <Link to="/" className="block">Home</Link>
          <Link to="/product" className="block">Categories</Link>
          <Link to="/cart" className="block">My Orders</Link>
          <Link to="/profile" className="block">Profile</Link>

          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-1 rounded">
              Login
            </button>
          </Link>
        </div>
      )}

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-3 py-3">
        <form onSubmit={handleSubmit} className="relative">
          <IoIosSearch className="absolute left-3 top-3 text-xl" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 h-11 border rounded-md bg-gray-100 outline-none"
          />
        </form>
      </div>
    </>
  );
}

export default Header;