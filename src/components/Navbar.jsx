import { Box, IconButton, InputBase, useTheme, Select, MenuItem } from "@mui/material"
import { ColorModeContext } from "../theme"
import { DarkModeOutlined, LightModeOutlined, Search } from "@mui/icons-material"
import { useContext, useEffect } from "react"
import AuthButton from "../pages/Auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeQuery } from "../configs/store/slicer/querySlicer"
import ShoppingCart from "./ShoppingCart"
import { axiosInstance } from "../configs/api/api"

const Navbar = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const GetAllCategory = async () => {
      try {
        const response = await axiosInstance.get("/categories")
        const { data } = response.data
        setCategory(data)
      } catch (error) {
        console.error("Error fetching product data:", error)
      }
    }
    GetAllCategory()
    console.log(category)
  }, [])

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      dispatch(changeQuery({ name: searchQuery, category: searchType }))
      navigate(`/search?q=${searchQuery}&type=${searchType}`)
    }
  }

  const handleSearchClick = () => {
    dispatch(changeQuery({ name: searchQuery, category: searchType }))
    navigate(`/search?q=${searchQuery}&type=${searchType}`)
  }

  return (
    <header>
      <nav>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ paddingX: { xs: 2, sm: 5 }, paddingY: { xs: 2, sm: 3 } }}
          bgcolor={theme.palette.secondary.main}
        >
          <Box marginRight={{ xs: 4, sm: 0 }}>
            <Link to={"/"}>
              <Box
                component={"img"}
                src="/Logo.png"
                sx={{ height: "50px", width: "50px", objectFit: "cover" }}
              />
            </Link>
          </Box>
          <Box display="flex" gap="10px" alignItems="center" bgcolor={"white"} borderRadius={2}>
            <Box width="100px">
              <Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                sx={{ padding: "2px" }}
              >
                <MenuItem value="all">All Category</MenuItem>
                {category.map((category) => {
                  return <MenuItem value={category.id}>{category.name}</MenuItem>
                })}
              </Select>
            </Box>
            <InputBase
              sx={{
                flex: 1,
                paddingY: "2px",
                paddingLeft: "20px",
                fontSize: "14px",
                color: "primary.dark"
              }}
              value={searchQuery}
              onKeyDown={handleSearchEnter}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />

            <Box>
              <IconButton onClick={handleSearchClick}>
                <Search fontSize="small" color="primary" />
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <ShoppingCart />
            <IconButton
              sx={{ display: { xs: "none", sm: "block" }, marginLeft: 2 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeOutlined sx={{ color: "orange" }} />
              ) : (
                <DarkModeOutlined sx={{ color: "indigo" }} />
              )}
            </IconButton>
            <AuthButton />
          </Box>
        </Box>
      </nav>
    </header>
  )
}

export default Navbar
