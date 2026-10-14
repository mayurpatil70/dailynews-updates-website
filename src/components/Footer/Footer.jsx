import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: Brand & About */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-danger p-2 fs-6 fw-bold">NA</span>
                <span className="fs-3 fw-bold text-white">The News Adda</span>
              </div>
            </Link>
            <p className="small text-secondary mb-3">
              {t('siteTitle')} - {t('tagline')}. हम निष्पक्ष और शोधपरक पत्रकारिता के माध्यम से जनता तक सत्य और तथ्यात्मक सूचनाएं पहुंचाने के लिए प्रतिबद्ध हैं।
            </p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2" title="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2" title="Twitter / X">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2" title="YouTube">
                <i className="bi bi-youtube text-danger"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm rounded-circle p-2" title="Instagram">
                <i className="bi bi-instagram text-danger"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>{t('categories')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/category/news360">{t('nav_news360')}</Link>
              </li>
              <li>
                <Link to="/category/politics">{t('nav_politics')}</Link>
              </li>
              <li>
                <Link to="/category/growth-story">{t('nav_growthStory')}</Link>
              </li>
              <li>
                <Link to="/category/adda-special">{t('nav_addaSpecial')}</Link>
              </li>
              <li>
                <Link to="/category/explainer">{t('nav_explainer')}</Link>
              </li>
              <li>
                <Link to="/category/sports">{t('nav_sports')}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>{t('quickLinks')}</h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/about-us">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link to="/contact-us">{t('contactUs')}</Link>
              </li>
              <li>
                <Link to="/privacy-policy">{t('privacyPolicy')}</Link>
              </li>
              <li>
                <Link to="/terms-conditions">{t('termsConditions')}</Link>
              </li>
              <li>
                <Link to="/admin">{t('adminDashboard')}</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5>{t('newsletterTitle')}</h5>
            <p className="small text-secondary mb-3">
              {t('newsletterSub')}
            </p>
            {subscribed ? (
              <div className="alert alert-success py-2 small" role="alert">
                <i className="bi bi-check-circle-fill me-1"></i> धन्यवाद! न्यूज़लेटर सफलतापूर्वक सब्सक्राइब हो गया।
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control form-control-sm bg-dark text-light border-secondary"
                    placeholder="आपका ईमेल (your@email.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-sm btn-danger px-3" type="submit">
                    {t('subscribeBtn')}
                  </button>
                </div>
              </form>
            )}
            <div className="mt-3 text-secondary" style={{ fontSize: '0.78rem' }}>
              <i className="bi bi-shield-lock me-1"></i> आपकी गोपनीयता हमारी प्राथमिकता है। स्पैम मुक्त।
            </div>
          </div>
        </div>

        {/* Admin Access Portal Row (Placed in Footer as requested) */}
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <div className="small text-secondary">
            <i className="bi bi-shield-lock me-1 text-danger"></i>
            संपादकीय टीम प्रवेश • Editorial Staff Portal
          </div>
          <Link
            to="/admin/login"
            className="btn btn-sm btn-outline-danger fw-semibold px-3 py-1 d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-shield-lock-fill text-danger"></i>
            <span>{t('adminDashboard')} / {t('adminLogin')}</span>
          </Link>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-strip d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <div>{t('copyrightText')}</div>
          <div className="d-flex gap-3 small">
            <Link to="/about-us">{t('aboutUs')}</Link>
            <Link to="/privacy-policy">{t('privacyPolicy')}</Link>
            <Link to="/terms-conditions">{t('termsConditions')}</Link>
            <Link to="/contact-us">{t('contactUs')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
