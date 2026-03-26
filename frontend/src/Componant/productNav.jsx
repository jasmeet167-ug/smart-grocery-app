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
    whitespace-nowrap
    px-3 py-1.5
    text-sm font-medium
    rounded-full
    bg-gray-200
    text-gray-800
    active:scale-95
    active:bg-purple-400
    transition-all duration-150
  `;

  return (
    <div
      className="
        flex gap-3 h-14 w-full
        sticky top-0 z-50
        items-center px-3
        bg-white
        overflow-x-auto
        scrollbar-hide
      "
    >
      <button className={btnClass} onClick={() => filterCategory([])}>
        All
      </button>

      <button className={btnClass} onClick={() => filterCategory(['vegetable'])}>
 Vegetables
      </button>

      <button className={btnClass} onClick={() => filterCategory(['fruit'])}>
         <FaAppleAlt />Fruits
      </button>

      <button className={btnClass} onClick={() => filterCategory(['sweet'])}>
        🍩 Sweet Tooth
      </button>

      <button className={btnClass} onClick={() => filterCategory(['bakery'])}>
        🥐 Bakery
      </button>

      <button className={btnClass} onClick={() => filterCategory(['masala'])}>
        🌶️ Masala & Oil
      </button>

      <button className={btnClass} onClick={() => filterCategory(['dairy'])}>
        🧀 Dairy & Bread
      </button>

      <button className={btnClass} onClick={() => filterCategory(['drinks'])}>
        🥤 Drinks
      </button>

      <button className={btnClass} onClick={() => filterCategory(['atta'])}>
        🌾 Atta & Dal
      </button>
    </div>
  );
};

export default ProductNav;
