import { createContext, useContext } from "react"



type Theme = "dark" | "light" | "system"

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}



 export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}