import { ShoppingCartOutlined } from "@mui/icons-material"
import { Badge, IconButton } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ShoppingCart = () => {
  const [cartCount, setCartCount] = useState(0)
  const { userData } = useSelector((state) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    setCartCount(userData?.cart?.length)
  }, [userData])
  return (
    <IconButton
      onClick={() => navigate("/cart")}
      sx={{ display: { xs: "none", sm: "block" }, paddingX: "15px" }}
    >
      <Badge badgeContent={cartCount} color="primary">
        <ShoppingCartOutlined color="black" />
      </Badge>
    </IconButton>
  )
}

export default ShoppingCart
