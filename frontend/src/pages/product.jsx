import React from 'react'
import { Link } from 'react-router-dom'
import ProductNav from '../Componant/productNav'

function Product({ Data, showBar = true, setData, cart, setCart }) {

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

  return (
    <>
      <ProductNav showBar={showBar} setData={setData} />

      <div className='grid grid-cols-2 md:grid-cols-4 p-4 gap-4'>
        {Data.map((items) => (
          <div key={items.id} className='border-2 bg-green-100 rounded shadow'>

            <Link to={`/product/${items.id}`}>
              <img
                src={items.image}
                alt={items.title}
                className='h-40 mx-auto'
              />
            </Link>

            <p className='text-center font-semibold'>{items.title}</p>
            <p className='text-center text-green-600'>₹ {items.price}</p>

            <button
              onClick={() => addToCart(items)}
              className='bg-blue-500 text-white px-3 py-1 rounded mx-auto block'
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </>
  )
}

export default Product
