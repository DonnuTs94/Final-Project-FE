import { useState, useEffect } from "react"
import { axiosInstance } from "../../configs/api/api"
import Buttons from "../../components/Button/ButtonTest"
import { Typography } from "@mui/material"
import ProductDetail from "./ProductDetail"
import { Box } from "@mui/system"
import { BASE_URL } from "../../configs/constant/baseUrl"
import ProductCard from "../../components/Card/CardNew"
import "react-toastify/dist/ReactToastify.css"
import { convertPriceWithCommas } from "../../helper/formatter"

const ProductList = () => {
  const [productData, setProductData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [open, setOpen] = useState(false)

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
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Typography variant="h2" mt={"40px"}>
        All Product List
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          mt: "20px"
        }}
      >
        {productData.map((product) => (
          <>
            <ProductCard
              key={product.id}
              onClick={() => handleProductClick(product)}
              image={product.productImages?.[0] && BASE_URL + product.productImages[0].imageUrl}
              alt={product.name}
              price={convertPriceWithCommas(product.price)}
              quantity={product.quantity}
              productId={product.id}
            />
          </>
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
        {selectedProduct && (
          <ProductDetail product={selectedProduct} onClose={handleCloseModal} open={open} />
        )}
      </Box>
    </>
  )
}

export default ProductList
