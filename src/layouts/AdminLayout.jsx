import { Box } from "@mui/material"
import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <Box display={"flex"} maxWidth={false} width={"100vw"} height={"100vh"}>
      <ProSidebar />
      <Box padding={2}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
