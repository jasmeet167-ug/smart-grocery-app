import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductNav from '../Componant/productNav'

function Product({ Data, showBar = true, setData, cart, setCart }) {

  const navigate = useNavigate()

  const addToCart = (product) => {
    const existing = cart.find(items => items.id === product.id)

    if (existing) {
      const updateCart = cart.map(items =>
        items.id === product.id
          ? { ...items, qty: items.qty + 1 }
          : items
      )
      setCart(updateCart)
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const handleBuyNow = (product) => {
    addToCart(product)
    navigate('/cart') // direct cart page par le jaega
  }

  return (
    <>
      <ProductNav showBar={showBar} setData={setData} />

      <div className='grid grid-cols-2 md:grid-cols-4 p-4 gap-4'>
        {Data.map((items) => (
          <div key={items.id} className='border-2 bg-green-100 rounded shadow p-2'>

            <Link to={`/product/${items.id}`}>
              <img
                src={items.image}
                alt={items.title}
                className='h-40 mx-auto'
              />
            </Link>

            <p className='text-center font-semibold'>{items.title}</p>
            <p className='text-center text-green-600'>₹ {items.price}</p>

         <div className='flex flex-col md:flex-row gap-2 mt-2'>
  <button
    onClick={() => addToCart(items)}
    className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded w-full text-sm md:text-base'
  >
    Add to Cart
  </button>

  <button
    
    className='bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full text-sm md:text-base'
  >
    Buy Now
  </button>
</div>

          </div>
        ))}
      </div>
    </>
  )
}

export default Product