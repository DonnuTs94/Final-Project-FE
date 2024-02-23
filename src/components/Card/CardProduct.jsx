import React from "react"
import Buttons from "../Button/ButtonTest"
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material"

const CardProduct = (props) => {
  const { children, img, name, price, handleAddToCart, id } = props

  return (
    <Card sx={{
      gap: 2,
      margin: 5,
      transform: "translate(-50%, -50%)",
      width: 400,
      flexDirection: "column",
      borderRadius: "5px",
      height: 400
    }} variant="outlined">
      <CardMedia className="h-60 w-full object-cover" image={img} title="shoes" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {/* {name.substring(0, 20)}... */}
          hello
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {children.substring(0, 100)}... */}
          hello
        </Typography>
      </CardContent>
      <CardActionArea>
        <Buttons size="small" color="primary" onClick={() => handleAddToCart(id)}>
          Add to Cart
        </Buttons>
        <Typography variant="body2" color="textPrimary">
          hello
          {/* {price.toLocaleString('id-ID', { style: 'currency', currency: 'USD' })} */}
        </Typography>
      </CardActionArea>
    </Card>
  )
}

export default CardProduct
