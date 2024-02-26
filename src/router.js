import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import AdminLayout from "./layouts/AdminLayout"
import CategoryPage from "./pages/AdminDashboard/Categories"
import ProductPage from "./pages/AdminDashboard/Product"
import OrderPage from "./pages/AdminDashboard/Order"
import UsersPage from "./pages/AdminDashboard/User"
import Homepage from "./pages/App/Homepage"
import ProductDetail from "./pages/App/ProductDetail"
import Page404 from "./pages/Page404"
import ProtectThisRoute from "./pages/ProtectThisRoute"
import ProductList from "./pages/Product/ProductList"
import SearchResultsPage from "./pages/Product/ProductResult.jsx"
import EditUserForm from "./pages/EditUser"
import CartPage from "./pages/App/CartPage.jsx"

const Router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { path: "/", Component: Homepage },
      { path: "/test", Component: ProductList },
      { path: "/search", Component: SearchResultsPage },
      { path: "/product/:id", Component: ProductDetail },
      { path: "/cart/", Component: CartPage },
      { path: "/user/edit", Component: EditUserForm }
    ]
  },
  {
    path: "/admin",
    // Component: ProtectThisRoute,
    Component: AdminLayout,

    children: [
      {
        path: "",
        // Component: AdminLayout
        Component: ProtectThisRoute
      },
      { path: "categories", Component: CategoryPage },
      { path: "products", Component: ProductPage },
      { path: "orders", Component: OrderPage },
      { path: "users", Component: UsersPage }
    ]
  },
  { path: "*", Component: Page404 }
])

export default Router
