// SearchResultsPage.js
import React, { useState, useEffect } from "react"
import { axiosInstance } from "../configs/api/api"
import ActionAreaCard from "../components/Card/CardProductAgain"
import { Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import { BASE_URL } from "../configs/constant/baseUrl"
import { useSelector } from "react-redux"

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const { queryProduct } = useSelector((state) => state.queryProduct)

  useEffect(() => {
    console.log(queryProduct)
    const fetchSearchResults = async () => {
      try {
        const response = await axiosInstance.get("/product")
        setSearchResults(response.data.data)
        console.log(response.data) // Log the response data
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    }

    fetchSearchResults()
  }, [queryProduct])

  const renderSearchResults = () => {
    return searchResults
      .filter((item) => item.name.toLowerCase().includes(queryProduct.toLowerCase()))
      .map((product) => (
        <ActionAreaCard
          key={product.id}
          onClick={() => console.log("Handle click on search result")}
          image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
          alt={product.name}
        >
          <Link key={product.id}>
            <Box>
              <Typography>{product.name}</Typography>
            </Box>
          </Link>
        </ActionAreaCard>
      ))
  }

  return (
    <Box>
      <Typography variant="h4">Search Results for "{queryProduct}"</Typography>
      {searchResults.length > 0 ? (
        renderSearchResults()
      ) : (
        <Typography variant="body1">No results found.</Typography>
      )}
    </Box>
  )
}

export default SearchResultsPage
