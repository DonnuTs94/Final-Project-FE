import { Box } from "@mui/material"
import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <Box display={"flex"} width={"100%"} height={"100%"} gap={3}>
      <Sidebar />
      <Box padding={3}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
