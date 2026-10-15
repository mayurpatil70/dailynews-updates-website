import React from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';

const AdminDashboard = () => {
  const { articles, deleteNews, toggleBreaking, resetToDefaults } = useNews();
  const { t } = useLanguage();

  const totalArticles = articles.length;
  const breakingCount = articles.filter(a => a.isBreaking).length;
  const featuredCount = articles.filter(a => a.isFeatured).length;
  const hindiCount = articles.filter(a => a.language === 'hi').length;
  const englishCount = articles.filter(a => a.language === 'en').length;

  const recentArticles = articles.slice(0, 6);

  const handleDelete = (id, title) => {
    if (window.confirm(`${t('admin_confirmDelete')}\n\n"${title}"`)) {
      deleteNews(id);
    }
  };

  const handleReset = () => {
    if (window.confirm('क्या आप समाचार डेटा को मूल प्रारंभिक अवस्था (Default Dataset) में रीसेट करना चाहते हैं?')) {
      resetToDefaults();
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">{t('admin_title')}</h2>
          <p className="text-muted small mb-0">{t('admin_subtitle')}</p>
        </div>

        <div className="d-flex gap-2">
          <button onClick={handleReset} className="btn btn-sm btn-outline-secondary">
            <i className="bi bi-arrow-counterclockwise me-1"></i> डेटा रीसेट करें
          </button>
          <Link to="/admin/add" className="btn btn-danger btn-sm fw-bold">
            <i className="bi bi-plus-lg me-1"></i> {t('admin_addNews')}
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3">
          <div className="admin-stat-card border-start border-4 border-danger">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small fw-semibold">{t('admin_totalArticles')}</div>
                <div className="fs-3 fw-bold text-body mt-1">{totalArticles}</div>
                <div className="small text-muted mt-1">हिन्दी: {hindiCount} | English: {englishCount}</div>
              </div>
              <div className="badge bg-danger bg-opacity-10 text-danger p-3 fs-3 rounded">
                <i className="bi bi-newspaper"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="admin-stat-card border-start border-4 border-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small fw-semibold">{t('admin_breakingCount')}</div>
                <div className="fs-3 fw-bold text-body mt-1">{breakingCount}</div>
                <div className="small text-warning-emphasis mt-1">टिकर में सक्रिय</div>
              </div>
              <div className="badge bg-warning bg-opacity-10 text-warning p-3 fs-3 rounded">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="admin-stat-card border-start border-4 border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small fw-semibold">{t('admin_featuredCount')}</div>
                <div className="fs-3 fw-bold text-body mt-1">{featuredCount}</div>
                <div className="small text-primary-emphasis mt-1">हीरो सेक्शन में प्रदर्शित</div>
              </div>
              <div className="badge bg-primary bg-opacity-10 text-primary p-3 fs-3 rounded">
                <i className="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-3">
          <div className="admin-stat-card border-start border-4 border-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small fw-semibold">सिस्टम स्थिति</div>
                <div className="fs-3 fw-bold text-success mt-1">सक्रिय</div>
                <div className="small text-muted mt-1">लोकल स्टोरेज सिंक सुरक्षित</div>
              </div>
              <div className="badge bg-success bg-opacity-10 text-success p-3 fs-3 rounded">
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Stories Table */}
      <div className="card shadow-sm border-0 bg-body-tertiary mb-4">
        <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3">
          <h5 className="fw-bold mb-0">
            <i className="bi bi-clock-history me-2 text-danger"></i>
            हाल ही में जोड़े गए समाचार (Recent News)
          </h5>
          <Link to="/admin/manage" className="btn btn-sm btn-outline-danger">
            {t('admin_manageNews')} →
          </Link>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-muted small">
                <tr>
                  <th style={{ width: '60px' }}>छवि</th>
                  <th>शीर्षक (Title)</th>
                  <th>श्रेणी</th>
                  <th>भाषा</th>
                  <th>तारीख</th>
                  <th>टिकर</th>
                  <th className="text-end">कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                {recentArticles.map(article => (
                  <tr key={article.id}>
                    <td>
                      <img
                        src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=100&q=80'}
                        alt=""
                        style={{ width: '48px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td>
                      <div className="fw-semibold text-truncate" style={{ maxWidth: '320px' }}>
                        {article.title}
                      </div>
                      <small className="text-muted">{article.author || 'Soar Samachar'}</small>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary-emphasis">
                        {article.categoryName || article.category}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info-subtle text-info-emphasis">
                        {article.language === 'hi' ? 'हिन्दी' : 'English'}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleBreaking(article.id)}
                        className={`btn btn-sm p-0 px-2 ${article.isBreaking ? 'btn-danger' : 'btn-outline-secondary'}`}
                        style={{ fontSize: '0.72rem' }}
                      >
                        {article.isBreaking ? 'हाँ' : 'नहीं'}
                      </button>
                    </td>
                    <td className="text-end">
                      <div className="btn-group btn-group-sm">
                        <Link to="/admin/manage" className="btn btn-outline-primary" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          className="btn btn-outline-danger"
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
