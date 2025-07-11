import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/login'
import { Forum } from './pages/forum'
import { Protect } from './components/protect'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<Protect><Forum /></Protect>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
