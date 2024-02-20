import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      AppLayout
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
