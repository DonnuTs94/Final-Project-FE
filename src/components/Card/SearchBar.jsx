import React, { useState, useEffect } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { axiosInstance } from "../../configs/api/api"
import Buttons from "../Button/ButtonTest"
import { useNavigate } from "react-router-dom"

const SearchBar = ({ onSearch }) => {
  const [suggestions, setSuggestions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/product", {
          params: { term: searchTerm }
        })
        setSuggestions(response.data)
      } catch (error) {
        console.error("Error fetching product suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [searchTerm])

  const handleInputChange = (event, value) => {
    setSearchTerm(value)
  }

  const handleSearchButtonClick = () => {
    if (onSearch) {
      onSearch(searchTerm)
    }
    navigate("/test2")
  }

  return (
    <>
      <Autocomplete
        freeSolo
        options={Array.isArray(suggestions) ? suggestions.map((product) => product.name || "") : []}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            margin="normal"
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
        ListboxComponent={(props) => (
          <List {...props}>
            {Array.isArray(suggestions) &&
              suggestions.map((product, index) => (
                <ListItem key={index} {...props}>
                  {product.name}
                </ListItem>
              ))}
          </List>
        )}
      />
      <Buttons variant="outlined" onClick={handleSearchButtonClick}>
        Search
      </Buttons>
    </>
  )
}

export default SearchBar
