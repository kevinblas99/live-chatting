import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import SettingsPage from "./pages/SettingsPage"
import Navbar from "./components/Navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import "./index.css"

function App() {
  const { authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )


  return (
    <div>
    <Navbar data-theme='light' />
    <Routes>
      <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />}></Route>
      <Route path="/signup" element={ !authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
      <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
      <Route path="/settings" element={<SettingsPage />}></Route>
      <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login"/>}></Route>
    </Routes>
    <Toaster />
    </div>
  )
}

export default App
