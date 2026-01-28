import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/router'
import { RouterProvider } from 'react-router'
import { ViewContextProvider } from './context/ViewContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewContextProvider>
      <RouterProvider router={router} />
    </ViewContextProvider>
  </StrictMode>,
)
