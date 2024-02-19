import { Container, Typography } from "@mui/material"

const App = () => {
  return (
    <Container
      maxWidth="100dvw"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        width: "100dvw"
      }}
    >
      <Typography variant="h1" color="primary">
        Hello World!
      </Typography>
    </Container>
  )
}

export default App
