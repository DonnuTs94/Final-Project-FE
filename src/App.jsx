import { RouterProvider } from "react-router-dom"
import Router from "./router"
import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUserData } from "./configs/store/slicer/userSlicer"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [theme, colorMode] = useMode()
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("auth_token") !== null) {
      dispatch(getUserData())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
