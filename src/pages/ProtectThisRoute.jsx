import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { getUserData } from "../configs/store/slicer/userSlicer"
// import { getUserData } from "./redux/userSlice" // Import the getUserData action creator

const ProtectThisRoute = () => {
  const { userData, loading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    // Dispatch the action to fetch user data if it's not already loaded
    if (!userData) {
      dispatch(getUserData())
    }

    if (localStorage.getItem("auth_token")) {
      dispatch(getUserData())
    }
  }, [])

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>
  }

  // Redirect if userData is null or user is not an admin
  if (!userData || (userData.Role && userData.Role.name !== "admin")) {
    return <Navigate to="/" />
  }

  // Render Outlet if user is authenticated as an admin
  return <Outlet />
}

export default ProtectThisRoute
