import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"

const ConfirmDialogDelete = ({ open, close, handleDelete, productId, dialog }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"Are you sure want to delete this product?"} */}
          {dialog}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleDelete(productId)
              close()
            }}
            autoFocus
            variant="contained"
            color="error"
            fullWidth
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialogDelete
