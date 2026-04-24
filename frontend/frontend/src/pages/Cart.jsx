import React from 'react'
import { CgClose } from "react-icons/cg";

function Cart({ cart = [], setCart }) {

  const addToCart = (product) => {
    const updatedCart = cart.map(item =>
      item.id === product.id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeOneFromCart = (productId) => {
    const existing = cart.find(item => item.id === productId)
    if (!existing) return

    if (existing.qty === 1) {
      setCart(cart.filter(item => item.id !== productId))
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      setCart(updatedCart);
    }
  };

  const removeAllFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotal = () => 
     cart.reduce((total, item) => total + item.price * item.qty,0)
    

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Cart is empty </p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-3 rounded mb-3 bg-white"
            >

              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>₹ {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeOneFromCart(item.id)}
                  className="px-2 bg-yellow-500 text-white rounded"
                >-</button>

                <span className="px-2">{item.qty}</span>

                <button
                  onClick={() => addToCart(item)}
                  className="px-2 bg-green-500 text-white rounded"
                >+</button>

                <button
                  onClick={() => removeAllFromCart(item.id)}
                  className="p-1 bg-red-500 text-white rounded"
                >
                  <CgClose />
                </button>
              </div>

            </div>
          ))}

          <div className="text-right mt-6">
            <h2 className="text-xl font-bold">
              Total: ₹ {getTotal()}
            </h2>

            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;