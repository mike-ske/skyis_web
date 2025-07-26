import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/auth/Dashboard";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerified from "./pages/auth/EmailVerified";

import CheckEmail from "./pages/auth/CheckEmail";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import InvalidToken from "./pages/auth/InvalidToken";
import Home from "./components/layout/home";
import BlogPage from "./components/layout/Blog";
import Contact from "./components/layout/contact";
import WaitingList from "./components/layout/waitinglist";
import SkyisFAQ from "./components/layout/Faq";
import FashionDesigner from "./components/layout/FashionDesigner";
import CreativeDesigner from "./components/layout/CreativeDesigner";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/WaitingList" element={<WaitingList />} />
          <Route path="/about" element={<Home />} />
          <Route path="/fashion-designer" element={<FashionDesigner />} />
          <Route path="/creative-designer" element={<CreativeDesigner />} />
          <Route path="/faq" element={<SkyisFAQ />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-reset/:token" element={<ResetPassword />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/verication-success" element={<VerificationSuccess />} />
          <Route path="/invalid-token" element={<InvalidToken />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />} >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
            <Route path="/mainpage" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
