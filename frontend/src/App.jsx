import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Product from "./pages/product.jsx";
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import Cart from "./pages/cart.jsx";
import Detaliproduct from "./pages/Detaliproduct.jsx";
import Search from "./pages/search.jsx";
import Data from "./Components/products.js";
import ProductsByCategory from "./pages/ProductsByCategory";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

const App = () => {
  const [data, setData] = useState([...Data]);
  const [cart, setCart] = useState([]);
  const [emailForOTP, setEmailForOTP] = useState("");
  const [dark, setDark] = useState(false);

  return (
    <Router>
      {/* GLOBAL THEME CLASS */}
      <div className={dark ? "dark" : "light"}>

        {/* PASS DARK STATE TO HEADER */}
        <Header cart={cart} dark={dark} setDark={setDark} />

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

            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword setEmailForOTP={setEmailForOTP} />} />
            <Route path="/verify-otp" element={<VerifyOTP email={emailForOTP} />} />
            <Route path="/change-password" element={<ChangePassword email={emailForOTP} />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
};

export default App;