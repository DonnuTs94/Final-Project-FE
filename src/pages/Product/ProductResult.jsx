import React, { useState, useEffect } from "react"
import { axiosInstance } from "../../configs/api/api"
import { Typography, Box, Pagination, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../configs/constant/baseUrl"
import { useSelector } from "react-redux"
import ProductCard from "../../components/Card/CardNew"
import Buttons from "../../components/Button/ButtonTest"

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const { queryProduct } = useSelector((state) => state.queryProduct)
  const itemsPerPage = 5
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axiosInstance.get(`/product?product=${queryProduct}`)
        setSearchResults(response.data.data)
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    }

    fetchSearchResults()
  }, [queryProduct])

  const renderSearchResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return searchResults
      .filter((item) => item.name.toLowerCase().includes(queryProduct.toLowerCase()))
      .slice(startIndex, endIndex)
      .map((product) => (
        <ProductCard
          key={product.id}
          onClick={() => console.log("Handle click on search result")}
          image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
          alt={product.name}
          price={product.price}
          quantity={product.quantity}
          category={product.categoryId && product.Category.name}
        >
          <Link to={`/product/${product.id}`} key={product.id}>
            <Box>
              <Typography>{product.name}</Typography>
            </Box>
          </Link>
        </ProductCard>
      ))
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const filteredResultsCount = searchResults.filter((item) =>
    item.name.toLowerCase().includes(queryProduct.toLowerCase())
  ).length

  return (
    <Box>
      <Typography variant="h4">Search Results for "{queryProduct}"</Typography>
      {filteredResultsCount > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 3,
            justifyContent: "center"
          }}
        >
          {renderSearchResults()}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="h1">No results found.</Typography>
          <Button variant="contained" component={Link} to="/" sx={{ marginTop: 2 }}>
            Back to Home
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {filteredResultsCount > itemsPerPage && (
          <Pagination
            count={Math.ceil(filteredResultsCount / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </Box>
  )
}

export default SearchResultsPage
