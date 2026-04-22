import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8050/auth/forgot-password",
        { email }
      )

      toast.success(res.data.message)

      setTimeout(() => {
        navigate("/verify-otp", { state: { email } })
      }, 1500)

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-orange-200">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <button className="bg-blue-500 text-white p-2 w-full">
          Send OTP
        </button>
        <ToastContainer />
      </form>
    </div>
  )
}

export default ForgotPassword