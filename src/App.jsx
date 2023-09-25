// Import necessary modules and components
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
// import Row from "./components/Row"
import { AuthContextProvider } from "./context/AuthContext"

import Signup from "./pages/Signup";
import Account from './pages/Account';
import LogIn from "./pages/LogIn"
import ProtectedRout from "./components/ProtectedRout"

function App() {
  return (
    <>
      {/* Wrap the entire application with AuthContextProvider to provide authentication context */}
      <AuthContextProvider>
        {/* Render the navigation bar */}
        <NavBar />

        {/* Define routes for the application */}
        <Routes>
          {/* Route for the home page */}
          <Route path='/' element={<Home />} />
          {/* Route for the login page */}
          <Route path='/login' element={<LogIn />} />

          {/* Route for the signup page */}
          <Route path='/signup' element={<Signup />} />

          {/* Route for the account page with a ProtectedRoute wrapper */}
          <Route path="/account" element={
            <ProtectedRout>
              <Account />
            </ProtectedRout>
          } />
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App
