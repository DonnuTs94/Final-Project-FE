import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"

const ActionAreaCard = (props) => {
  const { children, image, alt } = props
  return (
    <Card sx={{ maxWidth: 345, gap: 3, margin: 5, flexDirection: "column" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={""} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {children}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ActionAreaCard
