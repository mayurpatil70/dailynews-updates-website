import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import HeroFeatured from '../components/HeroFeatured';
import BreakingTicker from '../components/BreakingTicker';
import NewsCard from '../components/NewsCard';

const HomePage = () => {
  const { articles, getFeaturedNews } = useNews();
  const { language, t } = useLanguage();
  const [langFilter, setLangFilter] = useState('all');

  const safeArticles = articles || [];
  const featuredList = getFeaturedNews ? getFeaturedNews() : [];

  // Filter articles based on language toggle safely
  const filteredArticles = safeArticles.filter(item => {
    if (!item) return false;
    if (langFilter === 'all') return true;
    return item.language === langFilter;
  });

  const latestArticles = filteredArticles.slice(0, 9);
  const trendingArticles = safeArticles.slice().sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
  const politicsArticles = safeArticles.filter(item => item && item.category === 'politics').slice(0, 3);
  const growthArticles = safeArticles.filter(item => item && item.category === 'growth-story').slice(0, 3);

  return (
    <div className="home-page pb-5">
      {/* Breaking News Ticker */}
      <BreakingTicker />

      {/* Hero Featured Section */}
      <HeroFeatured featuredStories={featuredList} />

      <div className="container my-4">
        {/* Language Filter & Section Header */}
        <div className="section-header-wrap">
          <h2 className="section-title">
            <i className="bi bi-newspaper text-danger"></i> {t('latestNews')}
          </h2>

          <div className="btn-group btn-group-sm" role="group">
            <button
              type="button"
              className={`btn ${langFilter === 'all' ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setLangFilter('all')}
            >
              {t('allLanguages')}
            </button>
            <button
              type="button"
              className={`btn ${langFilter === 'hi' ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setLangFilter('hi')}
            >
              🇮🇳 हिन्दी
            </button>
            <button
              type="button"
              className={`btn ${langFilter === 'en' ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => setLangFilter('en')}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="row g-4">
          {/* Main Feed Column */}
          <div className="col-lg-8">
            <div className="row g-4">
              {latestArticles.map((article) => (
                <div key={article.id} className="col-md-6 col-lg-4">
                  <NewsCard article={article} />
                </div>
              ))}
            </div>

            {/* Pure Politics Section */}
            {politicsArticles.length > 0 && (
              <div className="mt-5">
                <div className="section-header-wrap">
                  <h3 className="section-title">
                    <i className="bi bi-bank text-danger"></i> {t('nav_politics')}
                  </h3>
                  <Link to="/category/politics" className="btn btn-sm btn-outline-danger">
                    {language === 'hi' ? 'सभी देखें →' : 'View All →'}
                  </Link>
                </div>
                <div className="row g-4">
                  {politicsArticles.map((article) => (
                    <div key={article.id} className="col-md-4">
                      <NewsCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Growth Story Section */}
            {growthArticles.length > 0 && (
              <div className="mt-5">
                <div className="section-header-wrap">
                  <h3 className="section-title">
                    <i className="bi bi-graph-up-arrow text-danger"></i> {t('nav_growthStory')}
                  </h3>
                  <Link to="/category/growth-story" className="btn btn-sm btn-outline-danger">
                    {language === 'hi' ? 'सभी देखें →' : 'View All →'}
                  </Link>
                </div>
                <div className="row g-4">
                  {growthArticles.map((article) => (
                    <div key={article.id} className="col-md-4">
                      <NewsCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="col-lg-4">
            {/* Trending / Most Read Widget */}
            <div className="sidebar-widget">
              <h5 className="sidebar-widget-title">
                <i className="bi bi-fire text-danger me-2"></i> {t('trendingNow')}
              </h5>
              <div className="d-flex flex-column gap-3">
                {trendingArticles.map((item, idx) => {
                  const title = language === 'en' && item.titleEn ? item.titleEn : item.title;
                  return (
                    <div key={item.id} className="d-flex gap-3 align-items-start border-bottom pb-2">
                      <span className="badge bg-danger rounded-circle p-2 fs-6 fw-bold" style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {idx + 1}
                      </span>
                      <div className="flex-grow-1">
                        <Link to={`/news/${item.id}`} className="text-decoration-none fw-semibold text-body small d-block mb-1" style={{ lineHeight: '1.3' }}>
                          {title}
                        </Link>
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                          <i className="bi bi-eye me-1"></i> {item.views || 1200} पाठक
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weather / City Info Card */}
            <div className="sidebar-widget bg-danger bg-opacity-10 border-danger border">
              <h6 className="fw-bold text-danger mb-2">
                <i className="bi bi-geo-alt-fill me-1"></i> {t('weatherCity')} - देवभूमि लाइव
              </h6>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <div className="fs-2 fw-bold text-body">20°C</div>
                  <div className="small text-muted">साफ आसमान • आर्द्रता 65%</div>
                </div>
                <i className="bi bi-sun-fill text-warning fs-1"></i>
              </div>
            </div>

            {/* The News Adda Live Widget matching user screenshot */}
            <div className="sidebar-widget p-0 overflow-hidden border-danger border">
              <div className="bg-danger text-white py-2 px-3 fw-bold d-flex align-items-center justify-content-between">
                <span>
                  <i className="bi bi-broadcast me-2 animate-flash"></i>
                  The News Adda Live
                </span>
                <span className="badge bg-white text-danger fw-bold">LIVE</span>
              </div>
              <div className="p-3 bg-body">
                <div className="ratio ratio-16x9 rounded overflow-hidden mb-2 bg-dark">
                  <iframe
                    src="https://www.youtube.com/embed/live_stream?channel=thenewsaddaa"
                    title="The News Adda Live Broadcast"
                    allowFullScreen
                    className="border-0"
                    loading="lazy"
                  ></iframe>
                </div>
                <h6 className="fw-bold mb-1 small">उत्तराखंड और देश की ताज़ा खबरों पर सीधा प्रसारण</h6>
                <p className="text-muted small mb-0">The News Adda डिजिटल चैनल पर देखें दिनभर की सबसे बड़ी सुर्खियां।</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
