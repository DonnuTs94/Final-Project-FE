import { Typography } from "@mui/material"
import ModalParent from "../../components/Modal"
import { BASE_URL } from "../../configs/constant/baseUrl"

const ProductDetail = ({ product }) => {
  return (
    <div>
      {console.log(product.productImages[0].imageUrl)}
      <ModalParent onOpen={open} onClose={() => setOpen(false)}>
        <Typography variant="h2">Product Detail</Typography>
        <img
          src={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
          alt={product.name}
          style={{ maxWidth: "20%" }}
        />
        <Typography>Name: {product.name}</Typography>
        <Typography>Quantity: {product.quantity}</Typography>
        <Typography>Price: {product.price}</Typography>
        <Typography>Total: {product.total}</Typography>
        <Typography>Description: {product.description}</Typography>
      </ModalParent>
    </div>
  )
}

export default ProductDetail
