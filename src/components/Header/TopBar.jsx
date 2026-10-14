import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useNews } from '../../context/NewsContext';

const TopBar = () => {
  const { language, t } = useLanguage();
  const { getBreakingNews, articles } = useNews();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Breaking news list for continuous right-to-left marquee loop
  const breakingList = useMemo(() => {
    const list = getBreakingNews ? getBreakingNews() : [];
    if (list && list.length > 0) return list;
    return (articles || []).slice(0, 8);
  }, [getBreakingNews, articles]);

  // Ensure enough items to smoothly fill the track and loop infinitely
  const tickerItems = useMemo(() => {
    if (!breakingList || breakingList.length === 0) return [];
    let items = [...breakingList];
    while (items.length < 6) {
      items = [...items, ...breakingList];
    }
    return items;
  }, [breakingList]);

  // Date picker
  const urlDate = searchParams.get('date') || '';
  const [selectedDate, setSelectedDate] = useState(urlDate);

  useEffect(() => {
    setSelectedDate(urlDate);
  }, [urlDate]);

  const handleDateChange = (e) => {
    const pickedDate = e.target.value;
    setSelectedDate(pickedDate);
    if (pickedDate) {
      navigate(`/category/all?date=${pickedDate}`);
    } else {
      navigate('/category/all');
    }
  };

  const handleClearDate = () => {
    setSelectedDate('');
    navigate('/category/all');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const getFormattedToday = () => {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return today.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', options);
  };

  return (
    <div className="topbar py-1">
      <div className="container-fluid px-2 px-lg-4 d-flex justify-content-between align-items-center">
        {/* Left: Interactive Date Picker (Desktop & Tablet) */}
        <div className="d-none d-lg-flex align-items-center gap-2 flex-shrink-0">
          <i className="bi bi-calendar3 text-danger fs-6"></i>
          <span className="small text-white-50">{getFormattedToday()}</span>
          <span className="text-secondary">|</span>
          <div className="d-flex align-items-center gap-1">
            <input
              type="date"
              className="form-control form-control-sm bg-dark text-light border-secondary py-0 px-2"
              style={{ fontSize: '0.76rem', height: '24px', width: '135px' }}
              value={selectedDate}
              onChange={handleDateChange}
              title="तारीख चुनें और उस दिन की खबरें देखें / Pick date to filter news"
            />
            {selectedDate && (
              <button
                type="button"
                onClick={handleClearDate}
                className="btn btn-sm btn-outline-danger py-0 px-1 d-flex align-items-center"
                style={{ height: '22px', fontSize: '0.72rem' }}
                title="फ़िल्टर हटाएं / Clear Date Filter"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>

        {/* Center: Continuous Floating Breaking News Sliding Right to Left in Loop */}
        {tickerItems.length > 0 && (
          <div className="topbar-ticker-section flex-grow-1 mx-1 mx-md-3 d-flex align-items-center overflow-hidden">
            <span
              className="badge bg-danger text-white py-1 px-2 me-1 me-md-2 d-flex align-items-center gap-1 flex-shrink-0 shadow-sm"
              style={{ fontSize: '0.70rem', letterSpacing: '0.5px', zIndex: 2 }}
            >
              <i className="bi bi-lightning-charge-fill animate-flash"></i>
              <span className="d-none d-sm-inline">{t('newsBuzz')}</span>
              <span className="d-inline d-sm-none">BUZZ</span>
            </span>

            <div className="topbar-ticker-marquee flex-grow-1 overflow-hidden position-relative">
              <div className="topbar-ticker-track">
                {/* 1st sequence of headlines */}
                {tickerItems.map((item, idx) => {
                  const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
                  return (
                    <span key={`t1-${item.id}-${idx}`} className="topbar-ticker-item">
                      <Link
                        to={`/news/${item.id}`}
                        className="topbar-ticker-link"
                        title={title}
                      >
                        {title}
                      </Link>
                      <span className="topbar-ticker-divider">•</span>
                    </span>
                  );
                })}

                {/* 2nd sequence of headlines for seamless 100% infinite right-to-left loop */}
                {tickerItems.map((item, idx) => {
                  const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
                  return (
                    <span key={`t2-${item.id}-${idx}`} className="topbar-ticker-item">
                      <Link
                        to={`/news/${item.id}`}
                        className="topbar-ticker-link"
                        title={title}
                      >
                        {title}
                      </Link>
                      <span className="topbar-ticker-divider">•</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Right: Socials (Desktop), Search (Desktop & Tablet) */}
        <div className="d-none d-md-flex align-items-center gap-1 gap-md-2 flex-shrink-0">
          {/* Social Icons - Desktop only */}
          <div className="d-none d-xl-flex gap-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" className="text-decoration-none">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="X / Twitter" className="text-decoration-none">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube" className="text-decoration-none text-danger">
              <i className="bi bi-youtube"></i>
            </a>
          </div>

          <span className="text-secondary d-none d-xl-inline">|</span>

          {/* Quick Search - Desktop & Tablet only */}
          <form onSubmit={handleSearch} className="d-none d-md-flex align-items-center">
            <div className="input-group input-group-sm" style={{ width: '135px' }}>
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '0.78rem' }}
              />
              <button className="btn btn-sm btn-outline-secondary" type="submit">
                <i className="bi bi-search text-light"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
