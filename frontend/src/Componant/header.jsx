import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

function Header({ cart }) { 
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const navigator = () => navigate(-1);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <>
      <div className="w-full h-16 px-4">
        <nav className="flex justify-between items-center h-full">

          {location.pathname !== "/" && (
            <button onClick={navigator} className="md:hidden">
              <FaLongArrowAltLeft className="text-black" />
            </button>
          )}

          <img
            src="logo.png"
            alt="logo"
            className="h-15 w-24 pt-3 object-contain drop-shadow-2xl"
          />

          {/* Desktop Search */}
          <div className="justify-center hidden sm:flex flex-1">
            <div className="relative w-full flex justify-center">
              <IoIosSearch className="text-black text-2xl absolute left-[26%] top-2" />
              <form onSubmit={handleSumbit} className="w-full flex justify-center">
                <input
                  type="text"
                  placeholder="search the products...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-2 border-gray-200 w-1/2 rounded-md bg-gray-100 px-5 pl-9 h-10 outline-none"
                />
              </form>
            </div>
          </div>

          {/* Menu */}
          <div className="hidden sm:flex items-center gap-5">
            <ul className="flex gap-6 text-gray-800">
              <li><Link to="/" className="hover:text-green-600">Home</Link></li>
              <li><Link to="/product" className="hover:text-green-600">Product</Link></li>
            </ul>
             <Link to="/login">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
              Login
            </button>
             </Link>
           

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <MdShoppingCart size={28} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!isOpen)}
            className="sm:hidden px-4 text-3xl text-black"
          >
            <RxHamburgerMenu />
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} sm:hidden bg-gray-100 space-y-2 pb-3 absolute top-16 left-0 w-full z-50`}>
        <ul className="text-gray-800 text-lg px-4 space-y-2">
          <li><Link to="/" className="hover:text-green-600">Home</Link></li>
          <li><Link to="/product" className="hover:text-green-600">Categories</Link></li>
          <li><Link to="/cart" className="hover:text-green-600">My Orders</Link></li>
          <li><Link to="/profile" className="hover:text-green-600">Profile</Link></li>
        </ul>
        <Link to="/login">
        <button className="bg-blue-600 text-white px-4 py-1 rounded ml-4">
          Login
        </button>
        </Link>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden w-full flex pt-4 pb-4 justify-center px-4">
        <form onSubmit={handleSumbit} className="relative w-full">
          <IoIosSearch className="text-black text-2xl absolute left-3 top-3" />
          <input
            type="text"
            placeholder="search the products...."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-200 px-9 bg-gray-100 w-full rounded-md h-12 outline-none"
          />
        </form>
      </div>
    </>
  );
}

export default Header;
