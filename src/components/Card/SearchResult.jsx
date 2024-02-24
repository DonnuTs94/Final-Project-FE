import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { axiosInstance } from "../../configs/api/api"
import ActionAreaCard from "../Card/CardProductAgain"
import { Box, Typography } from "@mui/material"
import Buttons from "../Button/ButtonTest"
import { BASE_URL } from "../../configs/constant/baseUrl"

const SearchResults = () => {
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get("q")

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axiosInstance.get("/product", {
          params: { term: searchQuery }
        })
        setSearchResults(response.data)
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    }

    if (searchQuery) {
      fetchSearchResults()
    }
  }, [searchQuery])

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)"
      }}
    >
      {searchResults.map((product) => (
        <ActionAreaCard
          key={product.id}
          image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
          alt={product.name}
        >
          <Box>
            <Typography>{product.name}</Typography>
          </Box>
        </ActionAreaCard>
      ))}
    </Box>
  )
}

export default SearchResults
