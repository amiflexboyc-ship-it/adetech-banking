import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import WhyChooseAdeTech from './components/WhyChooseAdeTech';
import Services from './components/Services';
import Map from './components/Map';
import CSR from './components/CSR';
import Customers from './components/Customers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileAppDock from './components/MobileAppDock';

// Auth Pages
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import WelcomeDashboard from './welcome/WelcomeDashboard';

// Customer Banking Portal Pages
import {
  DashboardLayout,
  Dashboard as CustomerDashboard,
  SendMoney,
  PayBills,
  Cards as CustomerCards,
  Transactions as CustomerTransactions,
  Profile as CustomerProfile,
  Notifications as CustomerNotifications
} from './pages/dashboard';

// Protected Route Wrapper
import ProtectedRoute from './components/ProtectedRoute';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#071527] text-white flex flex-col selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <About />
        <WhyChooseAdeTech />
        <Services />
        <Map />
        <CSR />
        <Customers />
        <Contact />
      </main>
      <Footer />

      <MobileAppDock />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Main Public Website */}
      <Route path="/" element={<HomePage />} />

      {/* Authentication Pages */}
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Mobile Welcome & Onboarding Showcase */}
      <Route path="/welcome" element={<WelcomeDashboard />} />
      <Route path="/onboarding" element={<WelcomeDashboard />} />

      {/* Dashboard Welcome — full screen, no sidebar, protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute redirectPath="/login">
            <WelcomeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Customer Banking Portal (Protected) — sidebar layout for all inner pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute redirectPath="/login">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<CustomerDashboard />} />
        <Route path="transfer" element={<SendMoney />} />
        <Route path="bills" element={<PayBills />} />
        <Route path="cards" element={<CustomerCards />} />
        <Route path="transactions" element={<CustomerTransactions />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="notifications" element={<CustomerNotifications />} />
      </Route>
    </Routes>
  );
}

export default App;
