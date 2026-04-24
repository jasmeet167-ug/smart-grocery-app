import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:8050/auth/signup', formData)

      toast.success(res.data.message)

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 ">

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          Signup
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-gray-600 mb-1">
              Email
            </label>
            <input
              type='email'
              name="email"
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              autoFocus
              placeholder='Enter your email'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">
              Password
            </label>
            <input
              type='password'
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
               autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
          >
            Signup
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 ml-1 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

        <ToastContainer />

      </div>
    </div>
  )
}

export default Signup
