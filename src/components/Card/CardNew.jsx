import { Card, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material"
import ArrowOutwardIcon from "@mui/icons-material/ArrowForward"
import Buttons from "../Button/ButtonTest"
import { Link } from "react-router-dom"

const ProductCard = ({ children, category, image, alt, price, quantity, productId }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 8 }}>
      <Box>
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
            <Typography>{children}</Typography>
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
          </Box>
        </CardContent>
      </Box>
    </Card>
  )
}

export default ProductCard
