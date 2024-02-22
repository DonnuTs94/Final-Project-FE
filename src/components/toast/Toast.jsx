import { Alert, Box, Snackbar } from "@mui/material"

const Toast = ({ open, close, message, colorStatus }) => {
  return (
    <>
      <Box width={500}>
        <Snackbar
          open={open}
          onClose={close}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert variant="filled" severity={colorStatus}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}

export default Toast
