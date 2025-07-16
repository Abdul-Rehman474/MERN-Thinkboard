import { Route, Routes, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

import HomePage from "./pages/Homepage"; 
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"; 
import { isLoggedIn } from "./lib/utils";
import Navbar from "./Components/Navbar";
import toast from "react-hot-toast";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
  return (
    <>
      {!hideNavbar && <Navbar />}  
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage />}/>
          <Route path="/HomePage" element={/*<HomePage />*/isLoggedIn() ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path="/create" element={<CreatePage />}/>
          <Route path="/note/:id" element={<NoteDetailPage />}/>
        </Routes>
      </div>
    </>
  );
};


export default App; 
