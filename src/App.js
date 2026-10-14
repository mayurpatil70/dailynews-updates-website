import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NewsProvider } from './context/NewsContext';

// Components
import TopBar from './components/Header/TopBar';
import Navbar from './components/Header/Navbar';
import FloatingBreakingNews from './components/FloatingBreakingNews';
import Footer from './components/Footer/Footer';

// Pages
import HomePage from './pages/HomePage';
import NewsDetailPage from './pages/NewsDetailPage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage } from './pages/StaticPages';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AddNews from './admin/AddNews';
import ManageNews from './admin/ManageNews';

// Style
import './App.css';

// Wrapper to conditionally render Public Header/Footer vs Admin
const AppContent = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <LoadingBar
        height={3}
        color="#dc3545"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Render Public TopBar and Exact Red Navbar */}
      {!isAdminRoute && (
        <>
          <TopBar />
          <Navbar />
        </>
      )}

      {/* Main Routes */}
      <main className="main-site-content">
        <Routes>
          {/* Public Home & Reader */}
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />

          {/* Dynamic Category Page */}
          <Route path="/category/:slug" element={<CategoryPage />} />

          {/* Legacy / Direct Category Routes for seamless compatibility */}
          <Route path="/general" element={<CategoryPage />} />
          <Route path="/business" element={<CategoryPage />} />
          <Route path="/entertainment" element={<CategoryPage />} />
          <Route path="/health" element={<CategoryPage />} />
          <Route path="/sports" element={<CategoryPage />} />
          <Route path="/science" element={<CategoryPage />} />
          <Route path="/technology" element={<CategoryPage />} />

          {/* Static Pages */}
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsPage />} />
          <Route path="/disclaimer" element={<TermsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add" element={<AddNews />} />
            <Route path="manage" element={<ManageNews />} />
          </Route>

          {/* Fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Floating Breaking News in Red Color */}
      {!isAdminRoute && <FloatingBreakingNews />}

      {/* Render Public Footer if not on Admin Portal */}
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NewsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </NewsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;