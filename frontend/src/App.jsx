import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Product from './pages/product'
import Header from './Componant/header'
import Footer from './Componant/footer'
import Cart from './pages/cart'
import Detaliproduct from './pages/Detaliproduct'
import Search from './pages/search'
import Data from './Componant/products'
import ProductsByCategory from './pages/ProductsByCategory'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'


const App = () => {

  const [data, setData] = useState([...Data])
  const [cart, setCart] = useState([])
    const [emailForOTP, setEmailForOTP] = useState("") // store email for OTP & change password


  return (
    <Router>
      <Header cart={cart} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/product"
            element={<Product cart={cart} setCart={setCart} Data={data} setData={setData} />}
          />

          <Route
            path="/product/category/:cat"
            element={<ProductsByCategory cart={cart} setCart={setCart} />}
          />

          <Route
            path="/product/:id"
            element={<Detaliproduct cart={cart} setCart={setCart} />}
          />

          <Route path="/search/:term" element={<Search />} />

          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

         <Route path="/login" element={<Login />} />
         <Route path="/signup"element={<Signup />}/>
        <Route path="/forgot-password" element={<ForgotPassword setEmailForOTP={setEmailForOTP} />} />
        <Route path="/verify-otp" element={<VerifyOTP email={emailForOTP} />} />
        <Route path="/change-password" element={<ChangePassword email={emailForOTP} />} />
        <Route path="*" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  )
}

export default App