import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import {useEffect} from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
    const { authUser,checkAuth ,isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    console.log({authUser});

    if(isCheckingAuth && !authUser) return (
        <div className="flex items-center justify-center p-5">
            <Loader className="size-10 animate-spin" />
        </div>
    )

  return (
      <div data-theme="retro">
        <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Routes>

          <Toaster />
      </div>
  )
}

export default App;
