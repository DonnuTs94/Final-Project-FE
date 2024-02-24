import React, { useState } from "react"
import ProductSearch from "./ProductSearch"
import { axiosInstance } from "../configs/api/api"
import { Box } from "@mui/system"
import { ListItem, ListItemText, Typography } from "@mui/material"

const ProductSearchPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [productData, setProductData] = useState([])
  const [selectedLetter, setSelectedLetter] = useState("")

  const searchProduct = async () => {
    try {
      const response = await axiosInstance.get("/product")
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (searchTerm) => {
    setSearchResults("")
  }

  return (
    <Box>
      <ProductSearch onSearch={handleSearch} />
      <ListItem>
        {searchResults.map((product) => (
          <ListItemText key={product.id}>{product.name}</ListItemText>
        ))}
      </ListItem>
      <Button
        key={letter}
        variant={selectedLetter === letter ? "contained" : "outlined"}
        onClick={() => handleLetterClick(letter)}
      ></Button>
    </Box>
  )
}

export default ProductSearchPage
