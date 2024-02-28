import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const SelectCategory = ({ category, handleCategory, categoryData }) => {
  const handleChange = (event) => {
    handleCategory(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120, height: "100%" }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={categoryData}
          label="Category"
          onChange={handleChange}
          color="secondary"
          sx={{ outline: "none", height: "50px" }}
        >
          {category.map((item, i) => (
            <MenuItem key={i} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SelectCategory
