import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const isAuth = localStorage.getItem('newsadda-admin-auth') === 'true';

  useEffect(() => {
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  const handleLogout = () => {
    localStorage.removeItem('newsadda-admin-auth');
    localStorage.removeItem('newsadda-admin-user');
    navigate('/admin/login');
  };

  return (
    <div className="admin-wrapper d-flex flex-column min-vh-100 bg-body">
      {/* Admin Top Navbar */}
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3 py-2 border-bottom border-secondary">
        <div className="container-fluid">
          <Link to="/admin" className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <img src="/logo.png" alt="Soar Samachar 3D Logo" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #d4af37' }} />
            <span className="badge bg-danger">ADMIN</span>
            <span className="fs-5">Soar Samachar</span>
          </Link>

          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="btn btn-sm btn-outline-light d-none d-sm-inline-flex align-items-center gap-1">
              <i className="bi bi-box-arrow-up-right"></i>
              <span>{t('admin_viewLive')}</span>
            </Link>

            <button
              onClick={toggleLanguage}
              className="btn btn-sm btn-outline-danger py-0 px-2 fw-bold text-white"
              title="Toggle Language"
            >
              {language === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}
            </button>

            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-outline-secondary py-0 px-2"
              title="Toggle Theme"
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun-fill text-warning"></i>
              ) : (
                <i className="bi bi-moon-stars-fill text-light"></i>
              )}
            </button>

            <div className="d-flex align-items-center gap-2 text-light small border-start ps-3 border-secondary">
              <i className="bi bi-person-circle fs-5 text-danger"></i>
              <span className="d-none d-md-inline">संपादक (Admin)</span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger ms-2"
                title="Logout"
              >
                <i className="bi bi-power me-1"></i> {t('admin_logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Main Layout with Sidebar */}
      <div className="container-fluid flex-grow-1">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 p-0 bg-dark admin-sidebar border-end border-secondary">
            <div className="d-flex flex-column gap-1 pt-3">
              <NavLink to="/admin" end className="admin-nav-item">
                <i className="bi bi-speedometer2"></i>
                <span>{t('admin_dashboard')}</span>
              </NavLink>

              <NavLink to="/admin/add" className="admin-nav-item">
                <i className="bi bi-plus-square-fill text-danger"></i>
                <span>{t('admin_addNews')}</span>
              </NavLink>

              <NavLink to="/admin/manage" className="admin-nav-item">
                <i className="bi bi-card-checklist"></i>
                <span>{t('admin_manageNews')}</span>
              </NavLink>

              <hr className="border-secondary my-3" />

              <Link to="/" className="admin-nav-item text-secondary">
                <i className="bi bi-house-door"></i>
                <span>मुख्य वेबसाइट देखें</span>
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-md-9 col-lg-10 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
