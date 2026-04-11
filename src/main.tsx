import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { NavigationProvider } from './context/NavigationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavigationProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </NavigationProvider>
  </StrictMode>,
)
