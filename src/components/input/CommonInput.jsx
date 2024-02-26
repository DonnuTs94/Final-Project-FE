import { TextField } from "@mui/material"

/**
 * Renders a common input component.
 *
 * @param {object} variant - the variant of the input
 * @param {string} label - the label of the input
 * @param {string} type - the type of the input
 * @param {boolean} disable - specifies if the input is disabled
 * @param {string} value - the value of the input
 * @return {JSX.Element} the common input component
 */

const CommonInput = ({
  variant = "outlined",
  label,
  type = "text",
  disable = false,
  value,
  onChange = () => {},
  onKeyDown
}) => {
  return (
    <>
      <TextField
        required
        disabled={disable}
        variant={variant}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        sx={{ width: "100%", my: 1, borderRadius: "8px", "&:focus": { outline: "none" } }}
      />
    </>
  )
}

export default CommonInput
