import { Box, Typography } from "@mui/material"
import StickyHeadTable from "../../components/CategoryTable"

const CategoryPage = () => {
  return (
    <Box width={"100%"}>
      <Typography marginBottom={5} variant="h3">
        Category Page
      </Typography>
      <StickyHeadTable />
    </Box>
  )
}

export default CategoryPage
