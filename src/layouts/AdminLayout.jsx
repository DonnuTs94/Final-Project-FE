import { Box } from "@mui/material"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <Box display={"flex"} maxWidth={false} width={"100vw"} height={"100vh"}>
      <Sidebar />
      <Box padding={2}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
