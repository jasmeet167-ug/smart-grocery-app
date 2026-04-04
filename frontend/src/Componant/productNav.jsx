import React from 'react';
import Data from './products';
import { FaAppleAlt } from "react-icons/fa";

const ProductNav = ({ showBar, setData }) => {
  if (!showBar) return null;

  const filterCategory = (categories) => {
    if (!categories || categories.length === 0) {
      setData(Data);
      return;
    }

    const filtered = Data.filter((product) =>
      categories.includes(product.category)
    );
    setData(filtered);
  };

  const btnClass = `
    px-3 py-1.5
    text-sm md:text-base
    font-semibold
    rounded-full
    bg-gray-200
    text-gray-800
    active:scale-95
    active:bg-orange-300
    transition-all duration-150
  `;

  return (
    <div
      className="
        flex flex-wrap gap-2
        w-full
        sticky top-0 z-50 mt-12
        items-center justify-center
        px-2
        bg-white
      "
    >
      <button className={btnClass} onClick={() => filterCategory([])}>
        All
      </button>

      <button className={btnClass} onClick={() => filterCategory(['vegetable'])}>
        Vegetables
      </button>

      <button className={btnClass} onClick={() => filterCategory(['fruit'])}>
        <FaAppleAlt className="inline mr-1" /> Fruits
      </button>

      <button className={btnClass} onClick={() => filterCategory(['sweet'])}>
        🍩 Sweet
      </button>

      <button className={btnClass} onClick={() => filterCategory(['bakery'])}>
        🥐 Bakery
      </button>

      <button className={btnClass} onClick={() => filterCategory(['masala'])}>
        🌶️ Masala
      </button>

      <button className={btnClass} onClick={() => filterCategory(['dairy'])}>
        🧀 Dairy
      </button>

      {/* ⚠️ yaha fix kiya */}
      <button className={btnClass} onClick={() => filterCategory(['drink'])}>
        🥤 Drinks
      </button>

      <button className={btnClass} onClick={() => filterCategory(['atta'])}>
        🌾 Atta
      </button>
    </div>
  );
};

export default ProductNav;