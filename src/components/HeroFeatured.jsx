import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HeroFeatured = ({ featuredStories = [] }) => {
  const { language } = useLanguage();

  if (!featuredStories || featuredStories.length === 0) return null;

  const mainStory = featuredStories[0];
  const sideStories = featuredStories.slice(1, 4);

  const fallbackImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';

  const getMainTitle = () => {
    return language === 'en' && mainStory.titleEn ? mainStory.titleEn : mainStory.title;
  };

  const getMainCategory = () => {
    return language === 'en' && mainStory.categoryNameEn ? mainStory.categoryNameEn : (mainStory.categoryName || mainStory.category);
  };

  return (
    <div className="container mb-4">
      <div className="row g-3">
        {/* Main Featured Highlight */}
        <div className="col-lg-7">
          <div className="hero-main-card position-relative">
            <img
              src={mainStory.urlToImage || fallbackImage}
              alt={getMainTitle()}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
            <div className="hero-overlay">
              <Link to={`/category/${mainStory.category}`} className="badge bg-danger text-uppercase px-2 py-1 mb-2 text-decoration-none">
                {getMainCategory()}
              </Link>
              <h2 className="fs-4 fw-bold mb-2">
                <Link to={`/news/${mainStory.id}`} className="text-white text-decoration-none">
                  {getMainTitle()}
                </Link>
              </h2>
              <div className="d-flex align-items-center gap-3 text-light opacity-75 small">
                <span>
                  <i className="bi bi-person-fill me-1"></i> {mainStory.author || 'Soar Samachar'}
                </span>
                <span>
                  <i className="bi bi-clock me-1"></i>
                  {new Date(mainStory.publishedAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Highlight Column */}
        <div className="col-lg-5">
          <div className="d-flex flex-column justify-content-between h-100">
            {sideStories.map((story) => {
              const title = language === 'en' && story.titleEn ? story.titleEn : story.title;
              const cat = language === 'en' && story.categoryNameEn ? story.categoryNameEn : (story.categoryName || story.category);
              return (
                <div key={story.id} className="hero-side-card">
                  <img
                    src={story.urlToImage || fallbackImage}
                    alt={title}
                    className="hero-side-card-img"
                    onError={(e) => {
                      e.target.src = fallbackImage;
                    }}
                  />
                  <div className="hero-side-card-content">
                    <div>
                      <Link to={`/category/${story.category}`} className="badge bg-secondary-subtle text-secondary-emphasis mb-1 text-decoration-none" style={{ fontSize: '0.7rem' }}>
                        {cat}
                      </Link>
                      <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem', lineHeight: '1.3' }}>
                        <Link to={`/news/${story.id}`} className="text-decoration-none text-body">
                          {title}
                        </Link>
                      </h6>
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      <i className="bi bi-clock me-1"></i>
                      {new Date(story.publishedAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeatured;
