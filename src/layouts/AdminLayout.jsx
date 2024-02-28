import { Box } from "@mui/material"
import SidebarPro from "../components/sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <Box display="flex" width="100vw" height="100vh">
      <SidebarPro />
      <Box padding={2} width="100%">
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
