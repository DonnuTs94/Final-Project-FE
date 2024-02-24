import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"

const AppLayout = () => {
  const { productData } = useSelector((state) => state.product)
  console.log(productData)

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
