import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/router'
import { RouterProvider } from 'react-router'
import { ViewContextProvider } from './context/ViewContext'
import { ThemeProvider } from './context/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ViewContextProvider>
      <RouterProvider router={router} />
    </ViewContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
