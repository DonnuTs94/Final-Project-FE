import { ShoppingCartOutlined } from "@mui/icons-material"
import { Badge, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ShoppingCart = () => {
  const [cartCount, setCartCount] = useState(0)
  const { userData } = useSelector((state) => state.users)

  useEffect(() => {
    setCartCount(userData?.cart?.length)
  }, [userData])
  return (
    <IconButton sx={{ display: { xs: "none", sm: "block" } }}>
      <Link to={"/cart"} reloadDocument>
        <Badge badgeContent={cartCount} color="primary">
          <ShoppingCartOutlined color="black" />
        </Badge>
      </Link>
    </IconButton>
  )
}

export default ShoppingCart
