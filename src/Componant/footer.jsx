import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyle =
    "hover:text-green-700 hover:underline transition duration-200";

  return (
    <footer className="bg-orange-300 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

          {/* About */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-bold mb-3">FreshMart 🥦</h2>
            <p className="text-sm text-gray-200">
              Fresh vegetables, fruits and daily groceries at best price.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link to="/" className={linkStyle}>Home</Link></li>
              <li><Link to="/product" className={linkStyle}>Shop</Link></li>
              <li><Link to="/offers" className={linkStyle}>Offers</Link></li>
              <li><Link to="/contact" className={linkStyle}>Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link to="/product/category/vegetable" className={linkStyle}>Vegetables</Link></li>
              <li><Link to="/product/category/fruit" className={linkStyle}>Fruits</Link></li>
              <li><Link to="/product/category/dairy" className={linkStyle}>Dairy</Link></li>
              <li><Link to="/product/category/bakery" className={linkStyle}>Bakery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <p className="text-sm text-gray-200">📞 +91 82838XXXXX</p>
            <p className="text-sm text-gray-200">📧 support@freshmart.com</p>

            <div className="flex justify-center sm:justify-start gap-4 mt-4 text-xl">
              <FaFacebook className="hover:text-blue-600 cursor-pointer transition" />
              <FaInstagram className="hover:text-pink-600 cursor-pointer transition" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer transition" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-500 mt-8 pt-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} FreshMart. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;