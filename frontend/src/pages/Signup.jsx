import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8070/auth/signup', formData)
      toast.success(res.data.message)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      // ✅ Handle 409 Conflict error
      if (err.response?.status === 409) {
        toast.error('Email already registered. Please login.')
      } else {
        toast.error(err.response?.data?.message || 'Signup failed')
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email" // ✅ add autocomplete
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password" // ✅ add autocomplete
              className="border p-2 w-full rounded"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Signup
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup