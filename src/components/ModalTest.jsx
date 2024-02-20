import { Box, Button, Input, Typography } from "@mui/material"
import ModalParent from "./Modal"

const ModalTest = ({ open, handleClose }) => {
  return (
    <ModalParent onOpen={open} onClose={handleClose} title={"Create Product"}>
      <Box>
        <Typography variant="h4">Test</Typography>
        <Input placeholder="Test Input" />
      </Box>
      <Box>
        <Typography>Test</Typography>
        <Input placeholder="Test Input" />
      </Box>
      <Box>
        <Typography>Test</Typography>
        <Input placeholder="Test Input" />
      </Box>
      <Button>Pencet</Button>
    </ModalParent>
  )
}

export default ModalTest
