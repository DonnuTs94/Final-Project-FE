import React from "react"
import { Card, CardContent, CardMedia, Link, Typography, Button, Box, Chip } from "@mui/material"
import ArrowOutwardIcon from "@mui/icons-material/ArrowForward"
import Buttons from "../Button/ButtonTest"

const ProductCard = ({ children, category, image, alt, price, quantity }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 8 }}>
      {image && (
        <Link to={`/product/${productId}`}>
          <CardMedia
            component="img"
            alt={alt}
            src={image}
            sx={{ height: 140, objectFit: "cover" }}
          />{" "}
        </Link>
      )}
      <CardContent
        sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="body1" color="grey">
            {category}
          </Typography>
          <Link variant="body1" color="black" underline="hover" endIcon={<ArrowOutwardIcon />}>
            {children}
          </Link>
          <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
            Rp.
            {price}
            <Chip size="small" label="Price" color="success" sx={{ ml: 1 }} />
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            (Only <b>{quantity}</b> left in stock!)
          </Typography>
          <Buttons variant="contained" color="error" size="large" sx={{ mt: 2, width: "100%" }}>
            Add to cart
          </Buttons>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCard
