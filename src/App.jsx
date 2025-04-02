import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Dashboard from "./pages/Dashboard"
import CityDetails from "./pages/CityDetails"

import Navbar from "./components/Navbar"
import "./index.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/city/:cityId" element={<CityDetails />} />
              
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App

