import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portal from "./Pages/Portal/Portal";
import Account from "./Pages/Account/Account";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import PrivateRoute from "./Components/PrivateRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Portal />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
