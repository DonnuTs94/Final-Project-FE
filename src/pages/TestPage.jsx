import { Button, Input } from "@mui/material"
import { useState } from "react"
import ModalParent from "../components/Modal"
import CreateProductForm from "../components/CreateProductForm"
import ModalTest from "../components/ModalTest"

const TestPage = () => {
  const [open, setOpen] = useState(false)

  const isOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <div>
      <div>
        <Button variant="outlined" onClick={isOpen}>
          ClickMey
        </Button>

        <ModalParent onOpen={open} onClose={onClose} title={"Halloo"}>
          <Input />
          <Button>Hallo</Button>
          <Input />
          <Button>Hallo</Button>
          <Input />
          <Button>Hallo</Button>
          <Input />
          <Button>Hallo</Button>
        </ModalParent>
      </div>
    </div>
  )
}

export default TestPage
