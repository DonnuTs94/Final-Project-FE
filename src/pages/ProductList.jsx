import React, { useState, useEffect } from "react"
import { axiosInstance } from "../configs/api/api"
import Buttons from "../components/Button/ButtonTest"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import ProductDetail from "./ProductDetailTest"
import ModalParent from "../components/Modal"
import ActionAreaCard from "../components/Card/CardProductAgain"
import { CardMedia } from "@mui/material"
import { Box } from "@mui/system"
import { BASE_URL } from "../configs/constant/baseUrl"
import Grid from "@mui/material/Grid"

const ProductList = () => {
  const [productData, setProductData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)"
      }}
    >
      {productData.map((product) => (
        <ActionAreaCard
          key={product.id}
          onClick={() => handleProductClick(product)}
          image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
          alt={product.name}
        >
          <Link key={product.id} onClick={() => handleProductClick(product)}>
            <Box>
              <Typography>{product.name}</Typography>
            </Box>
          </Link>
        </ActionAreaCard>
      ))}
      <Box>
        <Buttons
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Buttons>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <Buttons
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Buttons>
      </Box>
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </Box>
  )
}

export default ProductList
