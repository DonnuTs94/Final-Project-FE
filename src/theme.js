import { createContext, useMemo, useState } from "react"
import { createTheme } from "@mui/material/styles"
import { light } from "@mui/material/styles/createPalette"

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#d3d4d6",
          200: "#a7a9ad",
          300: "#7a7e83",
          400: "#4e535a",
          500: "#222831",
          600: "#1b2027",
          700: "#14181d",
          800: "#0e1014",
          900: "#07080a"
        },
        teal: {
          100: "#cceff0",
          200: "#99dee1",
          300: "#66ced3",
          400: "#33bdc4",
          500: "#00adb5",
          600: "#008a91",
          700: "#00686d",
          800: "#004548",
          900: "#002324"
        },
        peach: {
          100: "#fff4f4",
          200: "#ffe9e9",
          300: "#ffdddd",
          400: "#ffd2d2",
          500: "#ffc7c7",
          600: "#cc9f9f",
          700: "#997777",
          800: "#665050",
          900: "#332828"
        },
        white: {
          100: "#fcfcfc",
          200: "#f8f8f8",
          300: "#f5f5f5",
          400: "#f1f1f1",
          500: "#eeeeee",
          600: "#bebebe",
          700: "#8f8f8f",
          800: "#5f5f5f",
          900: "#303030"
        }
      }
    : {
        grey: {
          100: "#07080a",
          200: "#0e1014",
          300: "#14181d",
          400: "#1b2027",
          500: "#222831",
          600: "#4e535a",
          700: "#7a7e83",
          800: "#a7a9ad",
          900: "#d3d4d6"
        },
        teal: {
          100: "#002324",
          200: "#004548",
          300: "#00686d",
          400: "#008a91",
          500: "#00adb5",
          600: "#33bdc4",
          700: "#66ced3",
          800: "#99dee1",
          900: "#cceff0"
        },
        peach: {
          100: "#332828",
          200: "#665050",
          300: "#997777",
          400: "#cc9f9f",
          500: "#ffc7c7",
          600: "#ffd2d2",
          700: "#ffdddd",
          800: "#ffe9e9",
          900: "#fff4f4"
        },
        white: {
          100: "#303030",
          200: "#5f5f5f",
          300: "#8f8f8f",
          400: "#bebebe",
          500: "#eeeeee",
          600: "#f1f1f1",
          700: "#f5f5f5",
          800: "#f8f8f8",
          900: "#fcfcfc"
        }
      })
})

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode)

  return {
    pallete: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.teal[500]
            },
            secondary: {
              main: colors.peach[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: colors.teal[500]
            }
          }
        : {
            primary: {
              main: colors.teal[100]
            },
            secondary: {
              main: colors.peach[500]
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100]
            },
            background: {
              default: "#fcfcfc"
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
    }
  }
}

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
})

// cutom hook useMode
export const useMode = () => {
  const [mode, setMode] = useState("dark")

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
    primary: "#020617"
    secondary: "#475569"
    accend: "#71717a"
  }
  light: {
    primary: "#fafaf9"
    secondary: "#171717"
    accend: "#292524"
  }
}
