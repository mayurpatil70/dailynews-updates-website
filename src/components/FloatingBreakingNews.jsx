import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';

const FloatingBreakingNews = () => {
  const { getBreakingNews, articles } = useNews();
  const { language, t } = useLanguage();

  const breakingList = useMemo(() => {
    const list = getBreakingNews ? getBreakingNews() : [];
    if (list && list.length > 0) return list;
    return (articles || []).slice(0, 8);
  }, [getBreakingNews, articles]);

  const [isMinimized, setIsMinimized] = useState(false);

  // Ensure enough items to smoothly fill the track and loop infinitely
  const tickerItems = useMemo(() => {
    if (!breakingList || breakingList.length === 0) return [];
    let items = [...breakingList];
    while (items.length < 5) {
      items = [...items, ...breakingList];
    }
    return items;
  }, [breakingList]);

  if (!breakingList || breakingList.length === 0) return null;

  if (isMinimized) {
    return (
      <div
        className="floating-breaking-minimized"
        onClick={() => setIsMinimized(false)}
        title="ताज़ा ब्रेकिंग न्यूज़ देखें / Show Breaking News"
      >
        <i className="bi bi-lightning-charge-fill animate-flash me-1"></i>
        <span>{t('breakingNews')} ({breakingList.length})</span>
      </div>
    );
  }

  return (
    <div className="floating-breaking-bar">
      <div className="container-fluid px-2 px-md-3 d-flex align-items-center justify-content-between">
        {/* Left: Red Flashing Badge */}
        <div className="d-flex align-items-center gap-1 flex-shrink-0">
          <span className="floating-badge-alert">
            <i className="bi bi-lightning-fill text-danger me-1"></i>
            <span className="d-none d-sm-inline">{t('breakingNews').toUpperCase()}</span>
            <span className="d-inline d-sm-none">BREAKING</span>
          </span>
        </div>

        {/* Center: Continuous Floating News Marquee (Right-to-Left loop) */}
        <div className="floating-marquee-container flex-grow-1 overflow-hidden position-relative mx-2">
          <div className="floating-marquee-track">
            {/* 1st copy */}
            {tickerItems.map((item, idx) => {
              const displayTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;
              return (
                <span key={`f1-${item.id}-${idx}`} className="floating-marquee-item">
                  <Link
                    to={`/news/${item.id}`}
                    className="floating-headline-link"
                    title={displayTitle}
                  >
                    {displayTitle}
                  </Link>
                  <span className="floating-marquee-dot">•</span>
                </span>
              );
            })}
            {/* 2nd copy for seamless infinite loop */}
            {tickerItems.map((item, idx) => {
              const displayTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;
              return (
                <span key={`f2-${item.id}-${idx}`} className="floating-marquee-item">
                  <Link
                    to={`/news/${item.id}`}
                    className="floating-headline-link"
                    title={displayTitle}
                  >
                    {displayTitle}
                  </Link>
                  <span className="floating-marquee-dot">•</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Right: Minimize button */}
        <div className="d-flex align-items-center flex-shrink-0">
          <button
            onClick={() => setIsMinimized(true)}
            className="btn btn-sm text-white p-0 px-2 floating-ctrl-btn"
            title="Minimize / छुपाएं"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingBreakingNews;
