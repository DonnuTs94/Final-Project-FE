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
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "90%" }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={categoryData}
          label="Category"
          onChange={handleChange}
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
