import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

const ProductCard = ({ children, image, alt, price, quantity, productId }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 8 }}>
      {image && (
        <Link to={`/product/${productId}`}>
          <CardMedia
            component="img"
            height="140"
            alt={alt}
            src={image}
            sx={{ objectFit: "cover" }}
          />
        </Link>
      )}
      <CardContent>
        <Typography variant="body2">{children}</Typography>

        <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>
          Rp {price}
        </Typography>
        <Typography variant="body2">
          (Only <b>{quantity}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardContent>
        <Box textAlign={"center"}>
          <Button variant="contained" color="error" sx={{ padding: 1.3, width: "100%" }}>
            Add to cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCard
