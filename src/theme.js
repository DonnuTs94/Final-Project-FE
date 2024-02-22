import { createContext, useMemo, useState } from "react"
import { createTheme } from "@mui/material/styles"
import { deepOrange, purple } from "@mui/material/colors"

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#000105",
          200: "#010209",
          300: "#01040e",
          400: "#020512",
          500: "#020617",
          600: "#353845",
          700: "#676a74",
          800: "#9a9ba2",
          900: "#cccdd1"
        },
        secondary: {
          100: "#dadde1",
          200: "#b5bbc3",
          300: "#9199a5",
          400: "#6c7787",
          500: "#475569",
          600: "#394454",
          700: "#2b333f",
          800: "#1c222a",
          900: "#0e1115"
        },
        accent: {
          100: "#e3e3e4",
          200: "#c6c6ca",
          300: "#aaaaaf",
          400: "#8d8d95",
          500: "#71717a",
          600: "#5a5a62",
          700: "#444449",
          800: "#2d2d31",
          900: "#171718"
        }
      }
    : {
        primary: {
          100: "#fefefe",
          200: "#fdfdfd",
          300: "#fcfcfb",
          400: "#fbfbfa",
          500: "#fafaf9",
          600: "#c8c8c7",
          700: "#969695",
          800: "#646464",
          900: "#323232"
        },
        secondary: {
          100: "#d1d1d1",
          200: "#a2a2a2",
          300: "#747474",
          400: "#454545",
          500: "#171717",
          600: "#121212",
          700: "#0e0e0e",
          800: "#090909",
          900: "#050505"
        },
        accent: {
          100: "#d4d3d3",
          200: "#a9a8a7",
          300: "#7f7c7c",
          400: "#545150",
          500: "#292524",
          600: "#211e1d",
          700: "#191616",
          800: "#100f0e",
          900: "#080707"
        }
      })
})

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode)

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500]
            },
            secondary: {
              main: colors.secondary[500]
            },
            accent: {
              main: colors.accent[900]
            },
            background: {
              default: "#222222",
              paper: "#444444"
            }
          }
        : {
            primary: {
              main: "#b3b3b3"
            },
            secondary: {
              main: deepOrange[100]
            },
            accent: {
              main: purple[900]
            },
            background: {
              default: "#f1f1f1",
              paper: "#ffffff"
            }
          })
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14
      }
    },
    component: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none"
          }
        }
      }
    }
  }
}

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

// cutom hook useMode
export const useMode = () => {
  const [mode, setMode] = useState("light")

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light"))
    }),
    []
  )

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode]
}

export const button = () => {
  dark: {
    primary: "#e7e7e7"
    secondary: "#475569"
    accend: "#727272"
  }
  light: {
    primary: "#161616"
    secondary: "#8a8a8a"
    accend: "#444444"
  }
}
