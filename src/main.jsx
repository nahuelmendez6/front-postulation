import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Punto de entrada de la aplicación React.
 * 
 * - Importa estilos globales y de Bootstrap.
 * - Crea la raíz de la aplicación en el elemento HTML con id 'root'.
 * - Renderiza el componente principal <App /> dentro de <StrictMode> para ayudar a detectar problemas durante el desarrollo.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
