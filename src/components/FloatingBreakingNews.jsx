import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';

const FloatingBreakingNews = () => {
  const { getBreakingNews } = useNews();
  const { language, t } = useLanguage();
  const breakingList = getBreakingNews();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!breakingList || breakingList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % breakingList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [breakingList, isPaused]);

  if (!breakingList || breakingList.length === 0) return null;

  const safeIndex = currentIndex % breakingList.length;
  const currentItem = breakingList[safeIndex];

  if (!currentItem) return null;

  const displayTitle = language === 'en' && currentItem.titleEn ? currentItem.titleEn : currentItem.title;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + breakingList.length) % breakingList.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % breakingList.length);
  };

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
    <div
      className="floating-breaking-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-fluid px-3 d-flex align-items-center justify-content-between">
        {/* Left: Red Flashing Badge */}
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <span className="floating-badge-alert">
            <i className="bi bi-lightning-fill text-danger me-1"></i>
            {t('breakingNews').toUpperCase()}
          </span>
        </div>

        {/* Center: Headline with marquee/transition */}
        <div className="flex-grow-1 px-3 text-truncate">
          <Link
            to={`/news/${currentItem.id}`}
            className="floating-headline-link text-truncate d-block"
            title={displayTitle}
          >
            {displayTitle}
          </Link>
        </div>

        {/* Right: Controls & Minimize */}
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="btn btn-sm text-white p-0 px-1 floating-ctrl-btn"
            title="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={handleNext}
            className="btn btn-sm text-white p-0 px-1 floating-ctrl-btn"
            title="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="btn btn-sm text-white p-0 px-2 floating-ctrl-btn border-start ps-2"
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
