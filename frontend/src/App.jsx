
import { RouterProvider } from 'react-router-dom'
import router from './controller/router'

import "./assets/css/map.css"
import "./assets/css/index.css"

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
