import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import AdminLayout from "./layouts/AdminLayout"
import TestPage from "./pages/TestPage"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [{ path: "test", Component: TestPage }]
  },
  {
    path: "/admin",
    Component: AdminLayout
  },
  {
    path: "/test",
    Component: TestPage
  }
])

export default Router
