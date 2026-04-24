import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

function VerifyOTP() {

  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const [otp, setOtp] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:8050/auth/verify-otp",
        { email, otp }
      )

      toast.success(res.data.message)

      setTimeout(() => {
        navigate("/change-password", { state: { email } })
      }, 1500)

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Verify OTP</h2>
        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-3"
        />
        <button className="bg-blue-500 text-white p-2 w-full">
          Verify
        </button>
        <ToastContainer />
      </form>
    </div>
  )
}

export default VerifyOTP