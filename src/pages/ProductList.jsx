import React, { useState, useEffect } from "react"
import { axiosInstance } from "../configs/api/api"
import Buttons from "../components/Button/ButtonTest"
import { Typography } from "@mui/material"
import { Link } from "react-router-dom"
import ProductDetail from "./ProductDetailTest"
import ModalParent from "../components/Modal"
import ActionAreaCard from "../components/Card/CardProductAgain"
import { CardMedia } from "@mui/material"

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
  }

  return (
    <div>
      {/* <CardMedia image={"../components/Card/1.png"}>
          {productImages.map((product) => (
            <Link
              key={product.productImage}
              // onClick={() => handleProductClick(product)}
              // to={`/product/${product.id}`}
            >
              <div>
                <Typography>{product.productImage}</Typography>
              </div>
              //{" "}
            </Link>
          ))}
        </CardMedia> */}
      <Typography>Product List</Typography>
      {productData.map((product) => (
        // <Grid container spacing={3}>
        <ActionAreaCard>
          {/* <ProductCard> */}
          <Link
            key={product.id}
            onClick={() => handleProductClick(product)}
            // to={`/product/${product.id}`}
          >
            <div>
              <Typography>{product.name}</Typography>
            </div>{" "}
          </Link>
          {/* </ProductCard> */}
          //{" "}
        </ActionAreaCard>
      ))}{" "}
      <div>
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
      </div>
      {selectedProduct && <ProductDetailTest product={selectedProduct} />}
    </div>
  )
}

export default ProductList
