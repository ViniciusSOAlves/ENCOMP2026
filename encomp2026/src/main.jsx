import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import App from './App.jsx'
import CursosPainel from './components/CursosPainel.jsx'
import DashBoard from './components/DashBoard.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import PalestraPainel from './components/PalestraPainel.jsx'
import PatrocinadoresPainel from './components/PatrocinadoresPainel.jsx'
import EventosExtrasPainel from './components/EventosExtrasPainel.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/login',
    element: <AdminLogin />,
  },

  {
    element: <RotaProtegida />,
    children: [
      {
        path: '/dashboard',
        element: <DashBoard />,
        children: [
          {
            index: true,
            element: <CursosPainel />,
          },
          {
            path: 'cadastraPalestra',
            element: <PalestraPainel />,
          },
          {
            path: 'cadastraPatrocinador',
            element: <PatrocinadoresPainel />,
          },
          {
            path: 'cadastraEventos',
            element: <EventosExtrasPainel />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)