import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import { uploadMediaFile } from '../utils/uploadService';

const ManageNews = () => {
  const { articles, updateNews, deleteNews, toggleBreaking, toggleFeatured, categories } = useNews();
  const { t } = useLanguage();

  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [langFilter, setLangFilter] = useState('all');

  // Edit Modal State
  const [editingArticle, setEditingArticle] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  // Filtering
  const filteredArticles = articles.filter(item => {
    const matchesSearch = searchFilter
      ? (item.title && item.title.toLowerCase().includes(searchFilter.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(searchFilter.toLowerCase()))
      : true;
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLang = langFilter === 'all' || item.language === langFilter;
    return matchesSearch && matchesCat && matchesLang;
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`${t('admin_confirmDelete')}\n\n"${title}"`)) {
      deleteNews(id);
    }
  };

  const handleOpenEdit = (article) => {
    setEditingArticle(article);
    setUploadStatus('');
    setEditFormData({
      title: article.title || '',
      titleEn: article.titleEn || '',
      category: article.category || 'news360',
      language: article.language || 'hi',
      author: article.author || '',
      urlToImage: article.urlToImage || '',
      mediaType: article.mediaType || (/\.(mp4|webm|mkv|mov)$/i.test(article.urlToImage || '') ? 'video' : 'image'),
      description: article.description || '',
      content: article.content || '',
      isBreaking: !!article.isBreaking,
      isFeatured: !!article.isFeatured,
      tagsInput: article.tags ? article.tags.join(', ') : ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Multer upload inside edit modal
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Multer के माध्यम से अपलोड हो रहा है...');

    try {
      const result = await uploadMediaFile(file);
      if (result.success) {
        setEditFormData(prev => ({
          ...prev,
          urlToImage: result.url,
          mediaType: result.mediaType
        }));
        setUploadStatus(`सफल: ${result.filename} (${result.mediaType.toUpperCase()}) अपलोड हो गया!`);
      }
    } catch (err) {
      setUploadStatus('अपलोड त्रुटि: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData.title || !editFormData.description) {
      alert('शीर्षक और विवरण आवश्यक हैं!');
      return;
    }

    const selectedCat = categories.find(c => c.slug === editFormData.category);

    const updatedData = {
      title: editFormData.title,
      titleEn: editFormData.titleEn,
      category: editFormData.category,
      categoryName: selectedCat ? selectedCat.nameHi : editFormData.category,
      categoryNameEn: selectedCat ? selectedCat.nameEn : editFormData.category,
      language: editFormData.language,
      author: editFormData.author,
      urlToImage: editFormData.urlToImage,
      mediaType: editFormData.mediaType || 'image',
      description: editFormData.description,
      content: editFormData.content,
      isBreaking: editFormData.isBreaking,
      isFeatured: editFormData.isFeatured,
      tags: editFormData.tagsInput ? editFormData.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : []
    };

    updateNews(editingArticle.id, updatedData);
    setSaveSuccessMsg(t('admin_updateSuccess'));
    setTimeout(() => {
      setSaveSuccessMsg('');
      setEditingArticle(null);
    }, 1200);
  };

  return (
    <div className="admin-manage-news">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">{t('admin_manageNews')}</h2>
          <p className="text-muted small mb-0">मौजूदा समाचारों को खोजें, संपादित करें या हटाएं।</p>
        </div>
        <Link to="/admin/add" className="btn btn-danger btn-sm fw-bold">
          <i className="bi bi-plus-lg me-1"></i> {t('admin_addNews')}
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="card shadow-sm border-0 bg-body-tertiary mb-4">
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            {/* Search */}
            <div className="col-md-5">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-body">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="शीर्षक या लेखक के अनुसार खोजें..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-md-4">
              <select
                className="form-select form-select-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">सभी श्रेणियां (All Categories)</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.nameHi} / {c.nameEn}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="col-md-3">
              <select
                className="form-select form-select-sm"
                value={langFilter}
                onChange={(e) => setLangFilter(e.target.value)}
              >
                <option value="all">सभी भाषाएँ (All Languages)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="card shadow-sm border-0 bg-body-tertiary">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-muted small">
                <tr>
                  <th style={{ width: '60px' }}>छवि</th>
                  <th>शीर्षक (Title)</th>
                  <th>श्रेणी</th>
                  <th>भाषा</th>
                  <th>ब्रेकिंग</th>
                  <th>फीचर्ड</th>
                  <th>तारीख</th>
                  <th className="text-end">कार्रवाई (Actions)</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map(article => (
                    <tr key={article.id}>
                      <td>
                        <div className="position-relative d-inline-block" style={{ width: '48px', height: '40px' }}>
                          <img
                            src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=100&q=80'}
                            alt=""
                            style={{ width: '48px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                          {(article.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(article.urlToImage || '')) && (
                            <span className="position-absolute top-50 start-50 translate-middle badge bg-dark bg-opacity-75 p-1 rounded-circle">
                              <i className="bi bi-play-fill text-danger fs-6" style={{ lineHeight: 1 }}></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="fw-semibold text-truncate" style={{ maxWidth: '300px' }}>
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
                      <td>
                        <button
                          onClick={() => toggleBreaking(article.id)}
                          className={`btn btn-sm py-0 px-2 fw-semibold ${article.isBreaking ? 'btn-danger' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '0.72rem' }}
                          title="Toggle Breaking Ticker"
                        >
                          {article.isBreaking ? 'सक्रिय' : 'बंद'}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleFeatured(article.id)}
                          className={`btn btn-sm py-0 px-2 fw-semibold ${article.isFeatured ? 'btn-primary' : 'btn-outline-secondary'}`}
                          style={{ fontSize: '0.72rem' }}
                          title="Toggle Featured Hero"
                        >
                          {article.isFeatured ? 'सक्रिय' : 'बंद'}
                        </button>
                      </td>
                      <td className="small text-muted">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                          <Link
                            to={`/news/${article.id}`}
                            className="btn btn-outline-secondary"
                            title="View Story"
                            target="_blank"
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(article)}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(article.id, article.title)}
                            className="btn btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      कोई समाचार नहीं मिला।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal / Overlay Form */}
      {editingArticle && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content bg-body">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-pencil-square text-danger me-2"></i>
                  समाचार संपादित करें (Edit News Article)
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditingArticle(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                {saveSuccessMsg ? (
                  <div className="alert alert-success py-3 text-center">
                    <i className="bi bi-check-circle-fill me-2 fs-4 align-middle"></i>
                    <strong>{saveSuccessMsg}</strong>
                  </div>
                ) : (
                  <form onSubmit={handleSaveEdit}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label fw-bold">शीर्षक (Title) *</label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={editFormData.title}
                          onChange={handleEditChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold small">English Title (Optional)</label>
                        <input
                          type="text"
                          name="titleEn"
                          className="form-control"
                          value={editFormData.titleEn}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">श्रेणी (Category)</label>
                        <select
                          name="category"
                          className="form-select"
                          value={editFormData.category}
                          onChange={handleEditChange}
                        >
                          {categories.map(c => (
                            <option key={c.slug} value={c.slug}>{c.nameHi} / {c.nameEn}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">भाषा (Language)</label>
                        <select
                          name="language"
                          className="form-select"
                          value={editFormData.language}
                          onChange={handleEditChange}
                        >
                          <option value="hi">हिन्दी (Hindi)</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">लेखक (Author)</label>
                        <input
                          type="text"
                          name="author"
                          className="form-control"
                          value={editFormData.author}
                          onChange={handleEditChange}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-bold">टैग्स (Tags)</label>
                        <input
                          type="text"
                          name="tagsInput"
                          className="form-control"
                          value={editFormData.tagsInput}
                          onChange={handleEditChange}
                        />
                      </div>

                      {/* MULTER IMAGE & VIDEO UPLOAD IN EDIT MODAL */}
                      <div className="col-12">
                        <div className="p-3 bg-body-tertiary rounded border">
                          <label className="form-label fw-bold d-flex align-items-center gap-2 mb-2">
                            <i className="bi bi-cloud-arrow-up-fill text-danger fs-5"></i>
                            <span>छवि अथवा वीडियो बदलें (Change Image or Video via Multer)</span>
                          </label>

                          <div className="row g-3 align-items-center">
                            <div className="col-md-7">
                              <div className="input-group input-group-sm">
                                <input
                                  type="file"
                                  className="form-control"
                                  accept="image/*,video/*"
                                  onChange={handleFileUpload}
                                  disabled={uploading}
                                />
                                <span className="input-group-text bg-danger text-white">
                                  {uploading ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                  ) : (
                                    <i className="bi bi-upload"></i>
                                  )}
                                </span>
                              </div>
                              <div className="form-text small" style={{ fontSize: '0.72rem' }}>
                                सपोर्टेड फॉर्मेट: JPG, PNG, WEBP, MP4, WEBM, MOV (Multer Express सर्वर समर्थित)
                              </div>

                              {uploadStatus && (
                                <div className={`mt-2 small fw-semibold ${uploadStatus.includes('त्रुटि') ? 'text-danger' : 'text-success'}`}>
                                  <i className={`bi ${uploadStatus.includes('त्रुटि') ? 'bi-exclamation-circle' : 'bi-check2-circle'} me-1`}></i>
                                  {uploadStatus}
                                </div>
                              )}
                            </div>

                            <div className="col-md-5">
                              <div className="input-group input-group-sm">
                                <span className="input-group-text bg-body">URL:</span>
                                <input
                                  type="text"
                                  name="urlToImage"
                                  className="form-control"
                                  placeholder="https://... या /uploads/..."
                                  value={editFormData.urlToImage || ''}
                                  onChange={handleEditChange}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Live Media Preview: Image or Video */}
                          {editFormData.urlToImage && (
                            <div className="mt-3 p-2 bg-body rounded border">
                              <div className="small fw-semibold text-muted mb-2 d-flex align-items-center justify-content-between">
                                <span>
                                  {editFormData.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(editFormData.urlToImage) ? (
                                    <><i className="bi bi-camera-video-fill text-danger me-1"></i> वीडियो पूर्वावलोकन (Video Preview):</>
                                  ) : (
                                    <><i className="bi bi-image-fill text-primary me-1"></i> छवि पूर्वावलोकन (Image Preview):</>
                                  )}
                                </span>
                                <span className="badge bg-secondary text-uppercase">{editFormData.mediaType || 'image'}</span>
                              </div>

                              {editFormData.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(editFormData.urlToImage) ? (
                                <div className="ratio ratio-16x9 rounded overflow-hidden bg-black" style={{ maxHeight: '200px' }}>
                                  <video src={editFormData.urlToImage} controls className="w-100 h-100 object-fit-contain"></video>
                                </div>
                              ) : (
                                <img
                                  src={editFormData.urlToImage}
                                  alt="Preview"
                                  style={{ maxHeight: '160px', width: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-bold">संक्षिप्त विवरण (Summary) *</label>
                        <textarea
                          name="description"
                          rows="3"
                          className="form-control"
                          value={editFormData.description}
                          onChange={handleEditChange}
                          required
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-bold">पूर्ण लेख (Full Content)</label>
                        <textarea
                          name="content"
                          rows="6"
                          className="form-control"
                          value={editFormData.content}
                          onChange={handleEditChange}
                        ></textarea>
                      </div>

                      <div className="col-md-6">
                        <div className="form-check form-switch p-2 bg-body-tertiary rounded border">
                          <input
                            className="form-check-input ms-0 me-2"
                            type="checkbox"
                            name="isBreaking"
                            checked={editFormData.isBreaking}
                            onChange={handleEditChange}
                            id="editBreaking"
                          />
                          <label className="form-check-label fw-semibold" htmlFor="editBreaking">
                            ब्रेकिंग न्यूज़ में दिखाएं
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-check form-switch p-2 bg-body-tertiary rounded border">
                          <input
                            className="form-check-input ms-0 me-2"
                            type="checkbox"
                            name="isFeatured"
                            checked={editFormData.isFeatured}
                            onChange={handleEditChange}
                            id="editFeatured"
                          />
                          <label className="form-check-label fw-semibold" htmlFor="editFeatured">
                            मुख्य फीचर्ड में दिखाएं
                          </label>
                        </div>
                      </div>

                      <div className="col-12 mt-4 pt-3 border-top d-flex gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setEditingArticle(null)}
                        >
                          रद्द करें
                        </button>
                        <button type="submit" className="btn btn-danger fw-bold">
                          <i className="bi bi-save me-1"></i> बदलाव सहेजें (Update)
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
