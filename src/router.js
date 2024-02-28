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
import EditUserForm from "./pages/User/EditUser.jsx"
import CartPage from "./pages/App/CartPage.jsx"
import Order from "./pages/App/OrderPage"

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
      { path: "/user/edit", Component: EditUserForm },
      { path: "/order/", Component: Order }
    ]
  },
  {
    path: "/admin",
    Component: AdminLayout,

    children: [
      {
        path: "",
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
