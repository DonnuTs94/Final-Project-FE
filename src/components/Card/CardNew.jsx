import React from "react"
import { Card, CardContent, CardMedia, Chip, Link, Typography, Button } from "@mui/material"
import ArrowOutwardIcon from "@mui/icons-material/ArrowForward"

const ProductCard = ({ children, image, alt, price, quantity }) => {
  return (
    <Card sx={{ maxWidth: 345, gap: 3, margin: 5, flexDirection: "row", boxShadow: 8 }}>
      {image && <CardMedia component="img" height="140" alt={alt} src={image} />}
      <CardContent>
        <Typography variant="body2">{children}</Typography>
        <Link
          href="#product-card"
          variant="body2"
          color="primary"
          underline="hover"
          endIcon={<ArrowOutwardIcon />}
        >
          {children}
        </Link>
        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          {price}
          {/* <Chip size="small" label="Lowest price" color="success" sx={{ ml: 1 }} /> */}
        </Typography>
        <Typography variant="body2">
          (Only <b>{quantity}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardContent>
        <Button variant="contained" color="error" size="large">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard
