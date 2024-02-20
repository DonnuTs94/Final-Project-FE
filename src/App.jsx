import { RouterProvider } from "react-router-dom"
import Router from "./router"
import { colorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"

const App = () => {
  const [theme, colorMode] = useMode()

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </colorModeContext.Provider>
  )
}

export default App
