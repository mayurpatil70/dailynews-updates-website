import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';

const BreakingTicker = () => {
  const { getBreakingNews } = useNews();
  const { language, t } = useLanguage();
  const breakingList = getBreakingNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (breakingList.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % breakingList.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [breakingList.length, isPaused]);

  if (!breakingList || breakingList.length === 0) return null;

  const safeIndex = currentIndex % breakingList.length;
  const currentItem = breakingList[safeIndex];

  if (!currentItem) return null;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + breakingList.length) % breakingList.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % breakingList.length);
  };

  const displayTitle = language === 'en' && currentItem.titleEn ? currentItem.titleEn : currentItem.title;

  return (
    <div className="container my-3">
      <div
        className="breaking-ticker-wrap d-flex align-items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Label */}
        <div className="breaking-label">
          <i className="bi bi-lightning-charge-fill animate-flash"></i>
          <span>{t('newsBuzz')}</span>
        </div>

        {/* Ticker Content */}
        <div className="flex-grow-1 px-3 py-2 overflow-hidden text-truncate">
          <Link to={`/news/${currentItem.id}`} className="breaking-headline-link text-truncate d-block">
            {displayTitle}
          </Link>
        </div>

        {/* Controls */}
        <div className="d-flex align-items-center gap-1 pe-2">
          <button
            onClick={handlePrev}
            className="btn btn-sm btn-link text-secondary p-0 px-1"
            title="Previous Story"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="btn btn-sm btn-link text-secondary p-0 px-1"
            title={isPaused ? "Play" : "Pause"}
          >
            <i className={`bi ${isPaused ? 'bi-play-fill' : 'bi-pause-fill'}`}></i>
          </button>
          <button
            onClick={handleNext}
            className="btn btn-sm btn-link text-secondary p-0 px-1"
            title="Next Story"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
