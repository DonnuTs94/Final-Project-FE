import { useState, useEffect } from "react"
import { axiosInstance } from "../../configs/api/api"
import { Typography, Box, Pagination, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { BASE_URL } from "../../configs/constant/baseUrl"
import { useSelector } from "react-redux"
import ProductCard from "../../components/Card/CardNew"

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { queryProduct } = useSelector((state) => state.queryProduct)
  const { name, category, page } = queryProduct
  const itemsPerPage = 10

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axiosInstance.get(
          `/product?product=${name}&category=${category === "all" ? "" : category}&page=${page}`
        )
        const { data, currentPage, totalPages } = response.data
        setSearchResults(data)
        setCurrentPage(currentPage)
        setTotalPages(totalPages)
      } catch (error) {
        console.error("Error fetching search results:", error)
      }
    }
    fetchSearchResults()
  }, [queryProduct])

  const renderSearchResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    return searchResults.map((product) => (
      <ProductCard
        key={product.id}
        onClick={() => console.log("Handle click on search result")}
        image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
        alt={product.name}
        price={product.price}
        quantity={product.quantity}
        category={product.categoryId && product.Category.name}
        productId={product.id}
      >
        <Typography variant="h6" fontWeight={"bold"} sx={{ mt: "10px" }}>
          {product.name}
        </Typography>
      </ProductCard>
    ))
  }

  const handlePageChange = async (event, value) => {
    setCurrentPage(value)
    try {
      const response = await axiosInstance.get(
        `/product?product=${name}&category=${category === "all" ? "" : category}&page=${value}`
      )
      const { data, totalPages } = response.data
      setSearchResults(data)
      setTotalPages(totalPages)
    } catch (error) {
      console.error("Error fetching search results:", error)
    }
  }

  return (
    <Box>
      {searchResults.length > 0 ? (
        <Box>
          <Typography variant="h4" sx={{ marginTop: 3, marginLeft: 4 }}>
            Search Results : <b>"{name}"</b>
          </Typography>
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
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh"
          }}
        >
          <Typography variant="h1" alignItems="center">
            No products found.
          </Typography>
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
        {searchResults.length > 0 && (
          <Box>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SearchResultsPage
