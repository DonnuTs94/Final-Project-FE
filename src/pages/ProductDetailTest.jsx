import { Typography } from "@mui/material"
import React from "react"
import ModalParent from "../components/Modal"


const ProductDetail = ({ product }) => {
  return (
    <div>
      {/* <ModalParent
        onOpen={open}
        onClose={() => setOpen(false)}
      > */}
        <Typography variant="h2">Product Detail</Typography>
        <Typography>Name: {product.name}</Typography>
        <Typography>Quantity: {product.quantity}</Typography>
        <Typography>Price: {product.price}</Typography>
        <Typography>Total: {product.total}</Typography>
        <Typography>Description: {product.description}</Typography>
      {/* </ModalParent> */}
    </div>
  )
}

export default ProductDetail
