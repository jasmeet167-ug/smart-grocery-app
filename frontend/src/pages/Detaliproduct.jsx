import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Data from '../Components/products'
import Product from './product'

const Detaliproduct = ({ cart, setCart }) => {

  const { id } = useParams()
  const [product, setProduct] = useState({}) 
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    const filterProduct = Data.filter((items) => items.id == id)

    if (filterProduct.length > 0) {
      setProduct(filterProduct[0])

      const related = Data.filter(
        (p) =>
          p.category === filterProduct[0].category &&
          p.id !== filterProduct[0].id
      )
      setRelatedProducts(related)
    }
  }, [id])

  // ✅ ADD TO CART FROM DETAIL PAGE//     
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image */}
        <div className="flex justify-center items-center bg-green-100 rounded-lg p-4">
          <img src={product.image} alt={product.title} className="h-60 object-contain" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-green-600 text-xl font-semibold">₹ {product.price}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-sm text-gray-500">
            Fresh and high quality product directly from farm.
          </p>

          {/* ✅ WORKING BUTTON */}
          <button
            onClick={() => addToCart(product)}
            
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-6">
        <h3 className="text-xl font-bold px-4">Related Products</h3>
        <Product Data={relatedProducts} showBar={false} />
      </div>
    </>
  )
}

export default Detaliproduct
