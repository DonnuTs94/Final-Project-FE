import React, { useState } from "react"
import ProductSearch from "./ProductSearch"
import { Box } from "@mui/system"
import Buttons from "../components/Button/ButtonTest"
import { useNavigate } from "react-router-dom"

const ProductSearchPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (term) => {
    setSearchTerm(term)
    navigate(`/search?q=${term}`)
  }

  return (
    <Box>
      <ProductSearch onSearch={handleSearch} />
      {searchTerm && <SearchResults term={searchTerm} />}
      <Buttons variant="outlined" onClick={() => navigate("/")}>
        Back to Product List
      </Buttons>
    </Box>
  )
}

export default ProductSearchPage
