import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import NewsCard from '../components/NewsCard';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { getNewsById, articles } = useNews();
  const { language, t } = useLanguage();

  const article = getNewsById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <i className="bi bi-exclamation-circle text-danger fs-1 mb-3 d-block"></i>
          <h2 className="fw-bold mb-3">समाचार उपलब्ध नहीं है</h2>
          <p className="text-muted mb-4">यह समाचार हटा दिया गया है या इसका URL बदल चुका है।</p>
          <Link to="/" className="btn btn-danger">
            {t('backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  const title = language === 'en' && article.titleEn ? article.titleEn : article.title;
  const categoryName = language === 'en' && article.categoryNameEn ? article.categoryNameEn : (article.categoryName || article.category);
  const formattedDate = new Date(article.publishedAt || Date.now()).toLocaleDateString(
    language === 'hi' ? 'hi-IN' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  const relatedArticles = (articles || [])
    .filter(item => item && item.id !== article.id && item.category === article.category)
    .slice(0, 3);

  const shareUrl = window.location.href;
  const isAdmin = localStorage.getItem('newsadda-admin-auth') === 'true';

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl);
      }
      alert(language === 'hi' ? 'लिंक क्लिपबोर्ड पर कॉपी हो गया!' : 'Link copied to clipboard!');
    } catch (e) {
      alert(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link copied!');
    }
  };

  return (
    <div className="news-detail-page py-4">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">{t('nav_home')}</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/category/${article.category}`} className="text-decoration-none text-capitalize">
                {categoryName}
              </Link>
            </li>
            <li className="breadcrumb-item active text-truncate" style={{ maxWidth: '300px' }} aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Main Article Body */}
          <div className="col-lg-8">
            <article className="bg-body-tertiary p-3 p-md-4 rounded border">
              {/* Category Badge & Breaking Flag */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <Link to={`/category/${article.category}`} className="badge bg-danger text-uppercase px-2 py-1 text-decoration-none">
                  {categoryName}
                </Link>
                {article.isBreaking && (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-lightning-fill"></i> {t('breakingNews')}
                  </span>
                )}
              </div>

              {/* Headline */}
              <h1 className="fw-bold fs-2 mb-3 text-body" style={{ lineHeight: '1.3' }}>
                {title}
              </h1>

              {/* Subtitle / Excerpt */}
              {article.description && (
                <p className="lead fs-6 text-muted border-start border-danger border-3 ps-3 mb-4">
                  {article.description}
                </p>
              )}

              {/* Metadata & Author Bar */}
              <div className="d-flex flex-wrap justify-content-between align-items-center py-2 border-top border-bottom mb-4 small text-muted">
                <div className="d-flex align-items-center gap-3">
                  <span>
                    <i className="bi bi-person-circle text-danger me-1"></i>
                    <strong>{article.author || 'The News Adda'}</strong>
                  </span>
                  <span>
                    <i className="bi bi-calendar3 me-1"></i> {formattedDate}
                  </span>
                </div>

                {/* Social Share Icons */}
                <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                  <span className="fw-bold me-1">{t('share')}:</span>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-success p-1 px-2"
                    title="WhatsApp"
                  >
                    <i className="bi bi-whatsapp"></i>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary p-1 px-2"
                    title="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-dark p-1 px-2"
                    title="Twitter / X"
                  >
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="btn btn-sm btn-outline-secondary p-1 px-2"
                    title="Copy Link"
                  >
                    <i className="bi bi-link-45deg"></i>
                  </button>
                </div>
              </div>

              {/* Cover Media: Image or Video */}
              {article.urlToImage && (
                <div className="mb-4 rounded overflow-hidden">
                  {article.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(article.urlToImage) ? (
                    <div className="ratio ratio-16x9 rounded overflow-hidden bg-black shadow-sm">
                      <video
                        src={article.urlToImage}
                        controls
                        className="w-100 h-100 object-fit-contain rounded"
                        playsInline
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div style={{ maxHeight: '480px', overflow: 'hidden' }} className="rounded">
                      <img
                        src={article.urlToImage}
                        alt={title}
                        className="w-100 h-100 object-fit-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Full Content Body */}
              <div className="article-full-content">
                {article.content ? (
                  article.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>{article.description}</p>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-4 pt-3 border-top d-flex flex-wrap align-items-center gap-2">
                  <span className="small fw-bold text-muted">
                    <i className="bi bi-tags-fill me-1 text-danger"></i> Tags:
                  </span>
                  {article.tags.map((tag, i) => (
                    <span key={i} className="badge bg-secondary-subtle text-secondary-emphasis">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Edit this article shortcut only if Admin is logged in */}
              {isAdmin && (
                <div className="mt-4 p-3 bg-light-subtle rounded border d-flex justify-content-between align-items-center">
                  <span className="small text-muted">
                    <i className="bi bi-shield-lock me-1 text-danger"></i> एडमिन मोड: इस खबर को संपादित करें।
                  </span>
                  <Link to="/admin/manage" className="btn btn-sm btn-danger">
                    <i className="bi bi-pencil me-1"></i> {t('admin_editAction')}
                  </Link>
                </div>
              )}
            </article>

            {/* Related News Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-5">
                <div className="section-header-wrap">
                  <h3 className="section-title">
                    <i className="bi bi-grid-fill text-danger"></i> {t('relatedNews')}
                  </h3>
                </div>
                <div className="row g-4">
                  {relatedArticles.map((rel) => (
                    <div key={rel.id} className="col-md-4">
                      <NewsCard article={rel} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sidebar-widget">
              <h5 className="sidebar-widget-title">
                <i className="bi bi-star-fill text-warning me-2"></i> {t('nav_addaSpecial')}
              </h5>
              <div className="d-flex flex-column gap-3">
                {articles.slice(0, 4).map((item) => {
                  const itmTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;
                  return (
                    <div key={item.id} className="d-flex gap-2 align-items-start border-bottom pb-2">
                      <img
                        src={item.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80'}
                        alt={itmTitle}
                        style={{ width: '70px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <Link to={`/news/${item.id}`} className="text-decoration-none fw-semibold text-body small d-block mb-1">
                          {itmTitle}
                        </Link>
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                          {new Date(item.publishedAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sidebar-widget bg-body-tertiary text-center">
              <h6 className="fw-bold mb-2">The News Adda App</h6>
              <p className="small text-muted mb-3">
                देश-दुनिया की निष्पक्ष खबरें सबसे पहले पाने के लिए हमारे साथ बने रहें।
              </p>
              <Link to="/contact-us" className="btn btn-outline-danger btn-sm w-100">
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
