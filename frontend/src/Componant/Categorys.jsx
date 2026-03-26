import { Link } from "react-router-dom";
import products from "./Category";
function Category() {
  return (
    <>
      <h1 className="font-bold text-3xl pt-7 pb-8">Shop by Category</h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {products.map((items) => (
          <Link to={`/product/category/${items.key}`} key={items.id}>
            <div className="flex flex-col items-center rounded-xl bg-green-50 p-3 shadow-lg cursor-pointer">
              <img
                src={items.image}
                alt={items.title}
                className="w-full h-28 sm:h-40 object-contain"
              />
              <p className="text-center text-sm sm:text-lg font-medium mt-2">
                {items.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Category;
