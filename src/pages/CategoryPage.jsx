import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import NewsCard from '../components/NewsCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const { articles, categories } = useNews();
  const { language, t } = useLanguage();
  const [langFilter, setLangFilter] = useState('all');

  // Find category details
  const currentCategory = slug ? categories.find(c => c.slug === slug) : null;
  const isAll = !slug || slug === 'all';

  const dateParam = searchParams.get('date') || '';

  const formattedDateParam = dateParam
    ? new Date(dateParam).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const categoryTitle = dateParam
    ? (language === 'hi' ? `दिनांक अनुसार समाचार: ${formattedDateParam}` : `News for: ${formattedDateParam}`)
    : isAll
    ? (searchQuery ? `खोज परिणाम: "${searchQuery}"` : (language === 'hi' ? 'सभी समाचार' : 'All News'))
    : currentCategory
    ? (language === 'hi' ? currentCategory.nameHi : currentCategory.nameEn)
    : (slug ? slug.toUpperCase() : (language === 'hi' ? 'समाचार' : 'News'));

  // Filter articles safely
  let filtered = (articles || []).filter(item => {
    if (!item) return false;
    // Category match
    const matchesCat = isAll || item.category === slug;
    // Search query match
    const matchesQuery = searchQuery
      ? (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.titleEn && item.titleEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    // Date match
    const matchesDate = dateParam
      ? (item.publishedAt && item.publishedAt.slice(0, 10) === dateParam)
      : true;
    // Language filter match
    const matchesLang = langFilter === 'all' || item.language === langFilter;

    return matchesCat && matchesQuery && matchesLang && matchesDate;
  });

  return (
    <div className="category-page py-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">{t('nav_home')}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {categoryTitle}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="section-header-wrap mb-4">
          <h1 className="section-title">
            <i className={`bi ${dateParam ? 'bi-calendar-check' : (currentCategory?.icon || 'bi-newspaper')} text-danger me-2`}></i>
            {categoryTitle}
            <span className="badge bg-secondary fs-6 ms-2 align-middle">{filtered.length}</span>
            {dateParam && (
              <Link to={slug ? `/category/${slug}` : '/category/all'} className="btn btn-sm btn-outline-danger ms-2 py-0 px-2" style={{ fontSize: '0.78rem' }}>
                <i className="bi bi-x-circle me-1"></i> {language === 'hi' ? 'तारीख हटाएं' : 'Clear Date'}
              </Link>
            )}
          </h1>

          {/* Language Filter */}
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

        {/* Articles Grid */}
        {filtered.length > 0 ? (
          <div className="row g-4">
            {filtered.map(article => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-body-tertiary rounded border my-4">
            <i className="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
            <h4 className="fw-bold mb-2">{t('noNewsFound')}</h4>
            <p className="text-muted mb-4">
              {searchQuery ? `"${searchQuery}" से मेल खाती कोई खबर नहीं मिली।` : 'कृपया किसी अन्य श्रेणी या भाषा का चयन करें।'}
            </p>
            <Link to="/" className="btn btn-danger">
              {t('backToHome')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
