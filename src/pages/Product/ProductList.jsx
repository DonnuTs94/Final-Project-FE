import { useState, useEffect } from "react"
import { axiosInstance } from "../../configs/api/api"
import { Typography, Pagination } from "@mui/material"
import { Link } from "react-router-dom"
import { Box } from "@mui/system"
import { BASE_URL } from "../../configs/constant/baseUrl"
import ProductCard from "../../components/Card/CardNew"
import "react-toastify/dist/ReactToastify.css"
import { convertPriceWithCommas } from "../../helper/formatter"

const ProductList = () => {
  const [productData, setProductData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const getAllProduct = async (page) => {
      try {
        const response = await axiosInstance.get("/product", {
          params: {
            page: page
          }
        })

        const { data, currentPage, totalPages } = response.data
        setProductData(data)
        setCurrentPage(currentPage)
        setTotalPages(totalPages)
      } catch (error) {
        console.error("Error fetching product data:", error)
      }
    }

    getAllProduct(currentPage)
  }, [currentPage])

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        justifyContent: "center"
      }}
    >
      {productData.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <ProductCard
            key={product.id}
            image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
            alt={product.name}
            price={convertPriceWithCommas(product.price)}
            quantity={product.quantity}
            productId={product.id}
            category={product.categoryId && product.Category.name}
          >
            <Box>
              <Typography>{product.name}</Typography>
            </Box>
          </ProductCard>
        </Link>
      ))}
      <Box
        sx={{
          gridColumn: "span 5",
          textAlign: "center",
          marginTop: 2,
          justifyContent: "center",
          display: "flex"
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          color="primary"
          onChange={(event, value) => setCurrentPage(value)}
        />
      </Box>
    </Box>
  )
}

export default ProductList
