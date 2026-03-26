import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function VerifyOTP({ email }) {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8070/auth/verify-otp", { email, otp })
      toast.success("OTP verified")
      setTimeout(() => navigate("/change-password"), 1000)
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP invalid")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} className="border p-2 w-full mb-3" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Verify OTP</button>
        <ToastContainer />
      </form>
    </div>
  )
}

export default VerifyOTP