import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Box } from "@mui/material"

const AppLayout = () => {
  return (
    <>
      <Box minHeight="100vh" paddingBottom="60px" position="relative">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </>
  )
}

export default AppLayout
