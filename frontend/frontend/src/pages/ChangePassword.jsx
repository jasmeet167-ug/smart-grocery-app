import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"

function ChangePassword() {

  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
  "http://localhost:8050/auth/change-password",
  {
    email,
    newPassword,
    confirmPassword   // ✅ fixed
  }
)
      toast.success(res.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          Update Password
        </button>

        <ToastContainer />
      </form>
    </div>
  )
}

export default ChangePassword