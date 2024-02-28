import { Box, Modal, Typography } from "@mui/material"

const ModalParent = ({ title, onClose, onOpen, children }) => {
  return (
    <Modal open={onOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 500,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          borderRadius: 8,
          boxShadow: 5
        }}
      >
        <Typography variant="h2" sx={{ mt: "10px", pl: "20px", bgcolor: "#fff" }}>
          {title}
        </Typography>
        <Box pl={"30px"} mt={"20px"}>
          {children}
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalParent
