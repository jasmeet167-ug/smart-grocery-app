import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-orange-300 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8
          text-center sm:text-left
        ">

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
              <li>Home</li>
              <li>Shop</li>
              <li>Offers</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>Vegetables</li>
              <li>Fruits</li>
              <li>Dairy</li>
              <li>Bakery</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Contact</h2>
            <p className="text-sm text-gray-200">📞 +91 82838XXXXX</p>
            <p className="text-sm text-gray-200">📧 support@freshmart.com</p>

            <div className="flex justify-center sm:justify-start gap-4 mt-4 text-xl">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
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