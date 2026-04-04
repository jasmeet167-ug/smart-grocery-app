import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:8050/auth/login',
        loginInfo
      )

      toast.success(res.data.message)

      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>

        <div className="mb-4">
          <input
            onChange={handleChange}
            type='email'
            name="email"
            autoComplete='name'
            placeholder='Enter your email'
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-5">
          <input
            onChange={handleChange}
            type='password'
            name="password"
            autoComplete='current-password'
            placeholder='Enter your password'
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
  type="submit"
  className='w-full bg-blue-500 text-white py-2 rounded-md'
>
  Next
</button>

<p className="text-sm text-right mt-2">
  <Link to="/forgot-password" className="text-blue-500 hover:underline">
    Forgot Password?
  </Link>
</p>

<p className="mt-4 text-sm text-center">
  Do not have account?
  <Link to="/signup" className="text-blue-500 ml-1">
    Signup
  </Link>
</p>


        <ToastContainer />

      </form>
    </div>
  )
}

export default Login
