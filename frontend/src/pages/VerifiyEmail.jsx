import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function VerifyEmail() {

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8070/auth/verify?token=${token}`
        )
        toast.success(res.data.message)
      } catch (error) {
        toast.error("Invalid or expired token")
      }
    }

    if (token) verify()
  }, [token])

  return <h2>Email Verification...</h2>
}

export default VerifyEmail