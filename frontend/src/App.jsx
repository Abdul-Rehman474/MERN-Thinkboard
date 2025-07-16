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
      {/*<Navbar />
      <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />*/}     
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
// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="relative h-full w-full">
//         <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />

//           {/* Protected Routes */}
//           <Route
//             path="/HomePage"/////////
//             element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/create"
//             element={isLoggedIn() ? <CreatePage /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/note/:id"
//             element={isLoggedIn() ? <NoteDetailPage /> : <Navigate to="/login" />}
//           />
//         </Routes>
//       </div>
//     </>
//   );
// };

export default App; 
