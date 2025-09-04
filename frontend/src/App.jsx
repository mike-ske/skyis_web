import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import GettingStarted from "./pages/auth/GettingStarted";
import EmailVerified from "./pages/auth/EmailVerified";
import Otp from "./pages/auth/OTP";

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
import Marketplace from "./pages/auth/shop/Marketplace";
import Wedding from "./pages/auth/shop/wedding";
import Groomsmen from "./pages/auth/shop/Groomsmen";
import BridalDress from "./pages/auth/shop/Bridaldress";
import BridalShoes from "./pages/auth/shop/Bridalshoes";
import BridalAccessories from "./pages/auth/shop/BridalAccessories";
import BuyGroomsWear from "./pages/auth/shop/BuyGroomsWear";
import ReadyToWear from "./pages/auth/shop/ReadyToWear";
import Bestspoke from "./pages/auth/shop/Bestspoke";
import Thrift from "./pages/auth/shop/Thrift";
import Luxury from "./pages/auth/shop/Luxury";
import Dashboard from "./pages/Dashboard/Dashboard";

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
          <Route path="/otp" element={<Otp />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/GettingStarted" element={<GettingStarted />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/groomsmen" element={<Groomsmen />} />
          <Route path="/bridaldress" element={<BridalDress />} />
          <Route path="/bridalshoes" element={<BridalShoes />} />
          <Route path="bridalaccessories" element={<BridalAccessories />} />
          <Route path="/buygroomswear" element={<BuyGroomsWear />} />
          <Route path="/ready-to-wear" element={<ReadyToWear />} />
          <Route path="/bespoke" element={<Bestspoke />} />
          <Route path="/thrift" element={<Thrift />} />
          <Route path="/luxury" element={<Luxury />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="/collections" element={<Collections />} />
          <Route path="/designer-costumes" element={<DesignerCostumes />} />
          <Route path="/luxury-bags" element={<LuxuryBags />} />
          <Route path="/pre-owned-luxury" element={<PreOwnedLuxury />} /> */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />} >
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
