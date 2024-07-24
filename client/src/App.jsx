import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import "./global.css";
import GetUsers from "./pages/Admin/getUsers";
import Home from "./pages/Home/Home";
import Book from "./pages/Books/Book";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Approved from "./pages/Admin/Approved";
import Admin from "./pages/Admin/Admin";
import Library from "./pages/Admin/library";
import UsersLibrary from "./pages/Books/UsersLibrary";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { AuthProvider } from "../../server/src/Authentication/Authentication";
import Booking from "./pages/Books/Booking";
import Updating from "./pages/Books/Updating";
import Welcome from "./pages/Register/Welcome";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/GetUsers" element={<GetUsers />} />
            <Route path="/Approved" element={<Approved />} />
            <Route path="/Book" element={<Book />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Image" element={<Image />} />
            <Route path="/Library" element={<Library />} />
            <Route path="/UsersLibrary" element={<UsersLibrary />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Booking/:id" element={<Booking />} />
            <Route path="/Updating/:id" element={<Updating />} />
            <Route path="/Welcome" element={<Welcome />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
