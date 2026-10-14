import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NewsCard = ({ article }) => {
  const { language, t } = useLanguage();

  if (!article) return null;

  const displayTitle = language === 'en' && article.titleEn ? article.titleEn : article.title;
  const displayCategory = language === 'en' && article.categoryNameEn ? article.categoryNameEn : (article.categoryName || article.category);

  const formattedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString(
    language === 'hi' ? 'hi-IN' : 'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  const fallbackImage = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: displayTitle,
        text: article.description,
        url: window.location.origin + `/news/${article.id}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/news/${article.id}`);
      alert(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="news-card">
      {/* Thumbnail */}
      <div className="news-card-img-wrap">
        <Link to={`/news/${article.id}`}>
          <img
            src={article.urlToImage || fallbackImage}
            alt={displayTitle}
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </Link>
        <Link to={`/category/${article.category}`} className="news-category-badge text-decoration-none">
          {displayCategory}
        </Link>
        {(article.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(article.urlToImage || '')) && (
          <span
            className="badge bg-dark bg-opacity-75 text-white position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1 shadow-sm"
            style={{ fontSize: '0.70rem', zIndex: 2 }}
          >
            <i className="bi bi-play-circle-fill text-danger"></i> VIDEO
          </span>
        )}
        {article.isBreaking && (
          <span className="badge bg-danger position-absolute bottom-0 start-0 m-2" style={{ fontSize: '0.68rem' }}>
            <i className="bi bi-lightning-fill"></i> {t('breakingNews')}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="news-card-body">
        <Link to={`/news/${article.id}`} className="news-card-title">
          {displayTitle}
        </Link>

        <p className="news-card-desc">
          {article.description}
        </p>

        {/* Footer Meta */}
        <div className="news-card-meta">
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-clock text-secondary"></i>
            <span>{formattedDate}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              onClick={handleShare}
              className="btn btn-sm btn-link p-0 text-secondary"
              title={t('share')}
            >
              <i className="bi bi-share"></i>
            </button>
            <Link to={`/news/${article.id}`} className="btn btn-sm btn-outline-danger py-0 px-2 fw-semibold" style={{ fontSize: '0.75rem' }}>
              {t('readMore')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
