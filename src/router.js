import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import AdminLayout from "./layouts/AdminLayout"
import CategoryPage from "./pages/AdminDashboard/Categories"
import ProductPage from "./pages/AdminDashboard/Product"
import OrderPage from "./pages/AdminDashboard/Order"
import UsersPage from "./pages/AdminDashboard/User"
import Homepage from "./pages/App/Homepage"
import ProductDetail from "./pages/App/ProductDetail"
import ProductList from "./pages/ProductList"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { path: "/", Component: Homepage },
      { path: "/test", Component: ProductList },
      { path: "/product/:id", Component: ProductDetail }
    ]
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
