import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Portal from './Pages/Portal/Portal'
import Account from './Pages/Account/Account'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Portal/>}/>
      <Route path="/account" element={<Account/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}
