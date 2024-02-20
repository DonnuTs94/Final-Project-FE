import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import AdminLayout from "./layouts/AdminLayout"
import TestPage from "./pages/TestPage"
import CategoryPage from "./pages/AdminDashboard/Categories"
import ProductPage from "./pages/AdminDashboard/Product"
import OrderPage from "./pages/AdminDashboard/Order"
import UsersPage from "./pages/AdminDashboard/User"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [{ path: "test", Component: TestPage }]
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "categories", Component: CategoryPage },
      { path: "products", Component: ProductPage },
      { path: "orders", Component: OrderPage },
      { path: "users", Component: UsersPage }
    ]
  }
])

export default Router
