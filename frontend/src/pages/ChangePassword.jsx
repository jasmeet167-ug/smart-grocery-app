import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function ChangePassword({ email }) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8070/auth/change-password", {
        email, newPassword, comfirmPassword: confirmPassword
      })
      toast.success("Password changed successfully")
      setTimeout(() => navigate("/login"), 1000)
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <input type="password" placeholder="New Password" onChange={e => setNewPassword(e.target.value)} className="border p-2 w-full mb-3" required />
        <input type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} className="border p-2 w-full mb-3" required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Update Password</button>
        <ToastContainer />
      </form>
    </div>
  )
}

export default ChangePassword