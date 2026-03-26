import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8070/auth/login', formData)
      toast.success(res.data.message)
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="name"
          name="name"
          placeholder="name"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email" // ✅ autocomplete
          className="border p-2 w-full mb-3 rounded"
        />

  <input
          type="email"
          name="emai"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email" // ✅ autocomplete
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password" // ✅ autocomplete
          className="border p-2 w-full mb-3 rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 mb-2 rounded">
          Login
        </button>

        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>

        <ToastContainer />
      </form>
    </div>
  )
}

export default Login