import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { getUserData } from "../configs/store/slicer/userSlicer"

const ProtectThisRoute = () => {
  const { userData, loading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userData) {
      dispatch(getUserData())
    }

    if (localStorage.getItem("auth_token")) {
      dispatch(getUserData())
    }
  }, [dispatch, userData])

  useEffect(() => {}, [userData, loading, error])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!userData || (userData.Role && userData.Role.name !== "admin")) {
    return <Navigate to="/*" />
  }

  return <Outlet />
}

export default ProtectThisRoute
