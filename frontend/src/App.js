import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App;