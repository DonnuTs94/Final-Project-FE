import { Box, Modal, Typography } from "@mui/material"

const ModalParent = ({ title, onClose, onOpen, children }) => {
  return (
    <Modal open={onOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          border: "1spx solid #000",
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
          minHeight: 200
        }}
      >
        <Typography variant="h2" sx={{ mt: "30px", pl: "30px", bgcolor: "#BFEA7C" }}>
          {" "}
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
