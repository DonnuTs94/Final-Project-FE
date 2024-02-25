import { Box } from "@mui/material"
import Carousel from "react-material-ui-carousel"

const Banners = () => {
  const imagesBanner = ["banner1.jpg", "banner2.jpg", "banner3.jpg"]

  return (
    <>
      <Box width="100vw">
        <Carousel swipe="true" navButtonsAlwaysInvisible="true" animation="fade" indicators={false}>
          {imagesBanner.map((image, i) => (
            <Box
              key={i}
              component={"img"}
              src={image}
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ))}
        </Carousel>
      </Box>
    </>
  )
}

export default Banners
