import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import AdminLayout from "./layouts/AdminLayout"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout
  },
  {
    path: "/admin",
    Component: AdminLayout
  }
])

export default Router
