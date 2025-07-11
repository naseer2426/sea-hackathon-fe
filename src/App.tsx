import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/login'
import { Forum } from './pages/forum'
import { Protect } from './components/protect'
import { Profile } from './pages/profile'
import { Community } from './pages/community'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route index path="/forum" element={<Protect><Forum /></Protect>} />
          <Route path="/profile" element={<Protect><Profile /></Protect>} />
          <Route path="/community" element={<Protect><Community /></Protect>} />
          <Route path="*" element={<Navigate to="/login" />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
