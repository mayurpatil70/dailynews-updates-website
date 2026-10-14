import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const { language, t } = useLanguage();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsNavOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="exact-red-navbar sticky-top">
      <div className="container-fluid px-lg-4 d-flex align-items-center justify-content-between">
        {/* Left: Brand Logo & Links */}
        <div className="d-flex align-items-center flex-grow-1">
          {/* Logo matching exact reference image */}
          <Link to="/" className="exact-logo-link me-3 me-lg-4 text-decoration-none" onClick={closeMenu}>
            <span className="logo-the-news">The News</span>
            <span className="logo-adda-box">ADDA</span>
          </Link>

          {/* Desktop Navigation Links directly adjacent to logo */}
          <div className="d-none d-lg-flex align-items-center exact-nav-links">
            {/* होम */}
            <NavLink to="/" end className="exact-nav-item" onClick={closeMenu}>
              {t('nav_home')}
            </NavLink>

            {/* न्यूज़ 360 */}
            <NavLink to="/category/news360" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_news360')}
            </NavLink>

            {/* Growth स्टोरी */}
            <NavLink to="/category/growth-story" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_growthStory')}
            </NavLink>

            {/* PURE पॉलिटिक्स */}
            <NavLink to="/category/politics" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_politics')}
            </NavLink>

            {/* Adda स्पेशल */}
            <NavLink to="/category/adda-special" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_addaSpecial')}
            </NavLink>

            {/* Your कॉलम */}
            <NavLink to="/category/your-column" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_yourColumn')}
            </NavLink>

            {/* विश्लेषक / एक्सप्लेनर */}
            <NavLink to="/category/explainer" className="exact-nav-item" onClick={closeMenu}>
              {t('nav_explainer')}
            </NavLink>

            {/* अन्य Dropdown */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                type="button"
                className="exact-nav-item exact-dropdown-btn d-flex align-items-center gap-1 border-0 bg-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                <span>{t('nav_more')}</span>
                <i className={`bi bi-chevron-down exact-caret ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Exact Red Dropdown Menu matching user image */}
              {isDropdownOpen && (
                <div className="exact-red-dropdown-menu shadow-lg">
                  <Link to="/category/health" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'हेल्थ' : 'Health'}
                  </Link>
                  <Link to="/category/education" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'शिक्षा' : 'Education'}
                  </Link>
                  <Link to="/category/vidhayak" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'विधायक ट्रैकर' : 'MLA Tracker'}
                  </Link>
                  <Link to="/category/sports" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'खेल' : 'Sports'}
                  </Link>
                  <Link to="/category/entertainment" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'मनोरंजन' : 'Entertainment'}
                  </Link>
                  <Link to="/category/world" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'विदेश' : 'World'}
                  </Link>
                  <Link to="/category/viral" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'वायरल' : 'Viral'}
                  </Link>
                  <Link to="/category/environment" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'पर्यावरण' : 'Environment'}
                  </Link>
                  <Link to="/category/society" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'समाज' : 'Society'}
                  </Link>
                  <Link to="/category/religion" className="exact-dropdown-item" onClick={closeMenu}>
                    {language === 'hi' ? 'धर्म' : 'Religion'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggler (Language & Theme buttons kept only in topbar as requested) */}
        <div className="d-lg-none d-flex align-items-center">
          <button
            className="btn btn-sm text-white p-1"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`bi ${isNavOpen ? 'bi-x-lg fs-4' : 'bi-list fs-3'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isNavOpen && (
        <div className="exact-mobile-menu d-lg-none bg-danger p-3 border-top border-danger-subtle">
          <div className="d-flex flex-column gap-2">
            <NavLink to="/" end className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_home')}
            </NavLink>
            <NavLink to="/category/news360" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_news360')}
            </NavLink>
            <NavLink to="/category/growth-story" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_growthStory')}
            </NavLink>
            <NavLink to="/category/politics" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_politics')}
            </NavLink>
            <NavLink to="/category/adda-special" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_addaSpecial')}
            </NavLink>
            <NavLink to="/category/your-column" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_yourColumn')}
            </NavLink>
            <NavLink to="/category/explainer" className="exact-mobile-item" onClick={closeMenu}>
              {t('nav_explainer')}
            </NavLink>

            <div className="border-top border-white border-opacity-25 pt-2 mt-1">
              <div className="small fw-bold text-white text-opacity-75 mb-1 ps-2">{t('nav_more')}:</div>
              <div className="d-flex flex-wrap gap-1 ps-1">
                <Link to="/category/health" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>हेल्थ</Link>
                <Link to="/category/education" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>शिक्षा</Link>
                <Link to="/category/vidhayak" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>विधायक ट्रैकर</Link>
                <Link to="/category/sports" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>खेल</Link>
                <Link to="/category/entertainment" className="badge bg-white text-danger text-danger text-decoration-none p-2" onClick={closeMenu}>मनोरंजन</Link>
                <Link to="/category/world" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>विदेश</Link>
                <Link to="/category/viral" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>वायरल</Link>
                <Link to="/category/environment" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>पर्यावरण</Link>
                <Link to="/category/society" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>समाज</Link>
                <Link to="/category/religion" className="badge bg-white text-danger text-decoration-none p-2" onClick={closeMenu}>धर्म</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
