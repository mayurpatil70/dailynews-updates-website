import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileSearch, setMobileSearch] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch('');
      setShowSearchModal(false);
    }
  };

  return (
    <header className="site-header">
      {/* Rainbow Strip */}
      <div className="rainbow-brand-strip"></div>

      <div className="container py-3">
        <div className="row align-items-center">
          {/* Logo & Tagline */}
          <div className="col-12 col-md-7 text-center text-md-start">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3">
                <img
                  src="/logo.png"
                  alt="Soar Samachar 3D Logo"
                  className="logo-3d-img"
                />
                <div>
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="logo-main-hindi">सोर समाचार</span>
                    <span className="logo-main-english text-danger fw-bold d-none d-sm-inline">Soar Samachar</span>
                  </div>
                  <div className="logo-tagline text-muted">
                    <span className="fw-bold text-danger">{t('tagline')}</span>
                    <span className="d-none d-sm-inline"> • {t('subTagline')}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Banner / Mobile Controls */}
          <div className="col-12 col-md-5 mt-3 mt-md-0 d-flex justify-content-center justify-content-md-end align-items-center gap-2">
            {/* Mobile Only Controls */}
            <div className="d-flex d-md-none gap-2 align-items-center w-100 justify-content-center">
              <button
                onClick={toggleLanguage}
                className="btn btn-sm btn-outline-danger fw-bold"
                style={{ fontSize: '0.8rem' }}
              >
                {language === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}
              </button>
              <button
                onClick={toggleTheme}
                className="btn btn-sm btn-outline-secondary"
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <i className="bi bi-sun-fill text-warning"></i>
                ) : (
                  <i className="bi bi-moon-stars-fill"></i>
                )}
              </button>
              <button
                onClick={() => setShowSearchModal(!showSearchModal)}
                className="btn btn-sm btn-outline-secondary"
                title="Search"
              >
                <i className="bi bi-search"></i>
              </button>
              <Link to="/admin" className="btn btn-sm btn-danger fw-semibold">
                <i className="bi bi-shield-lock-fill me-1"></i> Admin
              </Link>
            </div>

            {/* Desktop Tagline Badge / Motto */}
            <div className="d-none d-md-block text-end">
              <div className="p-2 px-3 rounded border border-danger-subtle bg-danger bg-opacity-10 text-danger fw-bold" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-patch-check-fill me-1"></i>
                100% निष्पक्ष पत्रकारिता • सत्य एवं प्रामाणिक समाचार
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search input expander */}
        {showSearchModal && (
          <div className="d-md-none mt-2 pt-2 border-top">
            <form onSubmit={handleMobileSearch} className="d-flex gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder={t('searchPlaceholder')}
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-sm btn-danger">
                {t('searchBtn')}
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
