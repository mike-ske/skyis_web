import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext"; // ✅ Import CartProvider



// Layout Components
import ProtectedRoute from "./ProtectedRoute";
import OnboardingProtectedRoute from "./OnboardingProtectedRoute"; // New component for onboarding protection

// Public Pages
import Home from "./components/layout/home";
import BlogPage from "./components/layout/Blog";
import Contact from "./components/layout/contact";
import WaitingList from "./components/layout/waitinglist";
import SkyisFAQ from "./components/layout/Faq";
import FashionDesigner from "./components/layout/FashionDesigner";
import CreativeDesigner from "./components/layout/CreativeDesigner";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerified from "./pages/auth/EmailVerified";
import Otp from "./pages/auth/OTP";
import CheckEmail from "./pages/auth/CheckEmail";
import VerificationSuccess from "./pages/auth/VerificationSuccess";
import InvalidToken from "./pages/auth/InvalidToken";


import PublicRoute from './PublicRoute';
// import Profile from './components/Profile';

// Onboarding Pages
import UserOnboarding from "./pages/onboarding/UserOnboarding"; // The onboarding component we created
import OnboardingSuccess from "./pages/onboarding/OnboardingSuccess"; // Success page after onboarding

// Shop Pages (These should be accessible to both authenticated and non-authenticated users)
import Wedding from "./pages/auth/shop/wedding";

import BuyGroomsWear from "./pages/auth/shop/BuyGroomsWear";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import ListingsDashboard from "./pages/Dashboard/Listing";
import Orders from './pages/Dashboard/Orders';
import Auctions from './pages/Dashboard/Auctions';
import Collaborate from './pages/Dashboard/Collaborate';
import Notifications from './pages/Dashboard/Notifications';
import Settings from './pages/Dashboard/Settings';
import DashboardLayout from './pages/Dashboard/DashboardLayout';

// Shoppers Dashboard Layout and Components
import ShoppersDashboardLayout from "./pages/MyDashboard/ShopperDashboardLayout";
import Wishlist from './pages/MyDashboard/Wishlist';
import Following from './pages/MyDashboard/Following';
import ShopperDashboardOverview from './pages/MyDashboard/ShopperDashboard';
import ShopperListingDashboard from './pages/MyDashboard/ShopperListingDashboard';
import Checkout from './pages/auth/shop/Checkout';
import ProductDetailRent from './pages/auth/shop/ProductdetailRent';
import ProductDetailAuction from './pages/auth/shop/ProductDetailAuction';
import ProductDetailBuy from './pages/auth/shop/ProductDetailBuy';
import OrderHistory from './pages/auth/shop/OrderHistory';
import OrderDetails from './pages/auth/shop/OrderDetails';

// Main Pages
import Marketplace from './pages/auth/shop/Marketplace';
import Luxury from './pages/auth/shop/main-pages/Luxury';
import ReadyToWear from './pages/auth/shop/main-pages/ReadyToWear';
import Bespoke from './pages/auth/shop/main-pages/Bestspoke';
import Thrift from './pages/auth/shop/main-pages/Thrift';

// Wedding Pages
import Bridaldress from './pages/auth/shop/wedding-pages/Bridaldress';
import Bridalshoes from './pages/auth/shop/wedding-pages/Bridalshoes';
import Groomsmen from './pages/auth/shop/wedding-pages/Groomsmen';
import BridalAccessories from './pages/auth/shop/wedding-pages/BridalAccessories';

// Luxury Categories
import Collections from './pages/auth/shop/luxury-categories/Collections';
import DesignerCostumes from './pages/auth/shop/luxury-categories/DesignerCostumes';
import LuxuryBags from './pages/auth/shop/luxury-categories/LuxuryBags';
import PreOwnedLuxury from './pages/auth/shop/luxury-categories/PreOwnedLuxury';

// Ready-to-Wear Categories
import EverydayWear from './pages/auth/shop/ready-to-wear-categories/EverydayWear';
import CulturalWear from './pages/auth/shop/ready-to-wear-categories/CulturalWear';
import OccasionalWear from './pages/auth/shop/ready-to-wear-categories/OccasionalWear';

// Bespoke Categories
import CustomDesigns from './pages/auth/shop/bespoke-categories/CustomDesigns';
import MechStreetwear from './pages/auth/shop/bespoke-categories/MechStreetwear';
import FashionToOrder from './pages/auth/shop/bespoke-categories/FashionToOrder';

// Thrift Categories
import CrowdsourcedListings from './pages/auth/shop/thrift-categories/CrowdsourcedListings';
import VerifiedQuality from './pages/auth/shop/thrift-categories/VerifiedQuality';
import AuctionItems from './pages/auth/shop/thrift-categories/AuctionItems';
import { PaymentProvider } from './contexts/PaymentContext';
import { SearchProvider } from './contexts/SearchContext';
import SearchResults from './pages/auth/shop/SearchResults';
import { ProductsProvider } from './contexts/ProductsContext';

import EmailVerifyHandler from './pages/auth/EmailVerifyHandler';


function App() {
  return (
    <AuthProvider>
      {/* ✅ Wrap entire app with CartProvider INSIDE AuthProvider */}
       <ProductsProvider>
        <CartProvider>
          <PaymentProvider>
            <SearchProvider>
              <Router>
                <Routes>
                  {/* Public Routes - Accessible to everyone */}
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/WaitingList" element={<WaitingList />} />
                  <Route path="/fashion-designer" element={<FashionDesigner />} />
                  <Route path="/creative-designer" element={<CreativeDesigner />} />
                  <Route path="/faq" element={<SkyisFAQ />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPage />} />

                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                  {/* Product Detail Routes */}
                  {/* <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/product/auction/:id" element={<ProductDetailAuction />} />
                  <Route path="/product/rent/:id" element={<ProductDetailRent />} /> */}
                  <Route path="/search-results" element={<SearchResults />} />
                  {/* Protected Routes */}
                  <Route 
                    path="/orders" 
                    element={
                      <ProtectedRoute>
                        <OrderHistory />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/orders/:id" 
                    element={
                      <ProtectedRoute>
                        <OrderDetails />
                      </ProtectedRoute>
                    } 
                  />
                  
                  
                  <Route path="shopper-listings" element={<ShopperListingDashboard />} />
                  
                  {/* Public Routes - redirect to dashboard if authenticated */}
                  {/* Authentication Routes - Public (should redirect if already logged in) */}
                  <Route path="/login" element={ <Login /> } />
                  <Route path="/register" element={ <Register />} />
                  <Route path="/forgot-password" element={ <ForgotPassword />} />
                  <Route path="/password-reset/:token" element={ <ResetPassword />} />
                  <Route path="/password-reset" element={ <ResetPassword />} />
                  <Route path="/productdetail-rent/:id" element={<ProductDetailRent />} />
                  <Route path="/productdetail-auction/:id" element={<ProductDetailAuction />} />
                  <Route path="/productdetail-buy/:id" element={<ProductDetailBuy />} />
                  
                  {/* Email Verification Routes */}
                  <Route path="/check-email" element={<CheckEmail />} />
                  <Route path="/email-verified" element={<EmailVerified />} />
                  <Route path="/verication-success" element={<VerificationSuccess />} />
                  <Route path="/invalid-token" element={<InvalidToken />} />
                  <Route path="/otp" element={<Otp />} />
                  {/* // Add this route in your Routes section (after the auth routes) */}
                  <Route path="/email/verify/:id/:hash" element={<EmailVerifyHandler />} />

                  {/* Shop Routes - Public (accessible to both authenticated and non-authenticated users) */}
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/wedding" element={<Wedding />} />
                  {/* <Route path="/bridaldress" element={<BridalDress />} />
                  <Route path="/Bridalshoes" element={<Bridalshoes />} />
                  <Route path="/bridalaccessories" element={<BridalAccessories />} /> */}
                  <Route path="/buygroomswear" element={<BuyGroomsWear />} />
                  <Route path="/ready-to-wear" element={<ReadyToWear />} />

                  {/* Main Category Pages */}
                  <Route path="/luxury" element={<Luxury />} />
                  <Route path="/ready-to-wear" element={<ReadyToWear />} />
                  <Route path="/bespoke" element={<Bespoke />} />
                  <Route path="/thrift" element={<Thrift />} />

                  {/* Wedding Pages */}
                  <Route path="/bridal-dress" element={<Bridaldress />} />
                  <Route path="/bridal-shoes" element={<Bridalshoes />} />
                  <Route path="/groomsmen" element={<Groomsmen />} />
                  <Route path="/bridal-accessories" element={<BridalAccessories />} />

                  {/* Luxury Subcategories */}
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/designer-costumes" element={<DesignerCostumes />} />
                  <Route path="/luxury-bags" element={<LuxuryBags />} />
                  <Route path="/pre-owned-luxury" element={<PreOwnedLuxury />} />

                  {/* Ready-to-Wear Subcategories */}
                  <Route path="/everyday-wear" element={<EverydayWear />} />
                  <Route path="/cultural-wear" element={<CulturalWear />} />
                  <Route path="/occasional-wear" element={<OccasionalWear />} />

                  {/* Bespoke Subcategories */}
                  <Route path="/custom-designs" element={<CustomDesigns />} />
                  <Route path="/mech-streetwear" element={<MechStreetwear />} />
                  <Route path="/fashion-to-order" element={<FashionToOrder />} />

                  {/* Thrift Subcategories */}
                  <Route path="/crowdsourced-listings" element={<CrowdsourcedListings />} />
                  <Route path="/verified-quality" element={<VerifiedQuality />} />
                  <Route path="/auction-items" element={<AuctionItems />} />

                  {/* Onboarding Routes - Only for authenticated users who haven't completed onboarding */}
                  <Route element={<OnboardingProtectedRoute />}>
                    <Route path="/onboarding" element={<UserOnboarding />} />
                    <Route path="/onboarding-success" element={<OnboardingSuccess />} />
                  </Route>

                  {/* Protected Seller/Creator Dashboard Routes - For users without onboarding requirement */}
                  <Route element={<ProtectedRoute requireOnboarding={false} requireVerified={true} />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      {/* Redirect /dashboard to /dashboard/overview */}
                      <Route index element={<Navigate to="overview" replace />} />
                      
                      {/* Dashboard subroutes */}
                      <Route path="overview" element={<Dashboard />} />
                      <Route path="listing" element={<ListingsDashboard />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="auctions" element={<Auctions />} />
                      <Route path="collaborate" element={<Collaborate />} />
                      <Route path="notifications" element={<Notifications />} /> 
                      <Route path="settings" element={<Settings />} />
                      
                      {/* Catch unmatched dashboard routes */}
                      <Route path="*" element={<Navigate to="overview" replace />} />
                    </Route>
                  </Route>

                  {/* Protected Shoppers Dashboard Routes - For authenticated users (main dashboard for shoppers) */}
                  <Route element={<ProtectedRoute requireOnboarding={false}  requireVerified={true}/>}>
                    <Route path="/shopperdashboard" element={<ShoppersDashboardLayout />}>
                      {/* Redirect /shopperdashboard to /shopperdashboard/overview */}
                      <Route index element={<Navigate to="overview" replace />} />
                      
                      {/* Shopper Dashboard subroutes */}
                      <Route path="overview" element={<ShopperDashboardOverview />} />
                      <Route path="shopper-listings" element={<ShopperListingDashboard />} />
                      <Route path="orders" element={<Orders />} />
                      <Route path="wishlist" element={<Wishlist />} />
                      <Route path="following" element={<Following />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="settings" element={<Settings />} />
                      
                      {/* Legacy routes for backward compatibility */}
                      <Route path="auctions" element={<Auctions />} />
                      <Route path="collaborate" element={<Collaborate />} />
                      
                      {/* Catch unmatched dashboard routes */}
                      <Route path="*" element={<Navigate to="overview" replace />} />
                    </Route>
                  </Route>


                  {/* Catch all route - redirect to home for public or appropriate page for authenticated users */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </SearchProvider>
          </PaymentProvider>
        </CartProvider>
      </ProductsProvider>
      {/* ✅ End CartProvider */}
    </AuthProvider>
  );
}

export default App;