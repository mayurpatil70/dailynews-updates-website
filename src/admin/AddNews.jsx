import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import { uploadMediaFile } from '../utils/uploadService';

const PRESET_IMAGES = [
  { label: 'राजनीति / संसद', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80' },
  { label: 'अर्थव्यवस्था / किसान', url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'विज्ञान / AI', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80' },
  { label: 'क्रिकेट / खेल', url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3b0?auto=format&fit=crop&w=1000&q=80' },
  { label: 'स्वास्थ्य / योग', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'फिल्म / संस्कृति', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80' },
  { label: 'उत्तराखंड / पहाड़', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80' },
];

const AddNews = () => {
  const { addNews, categories } = useNews();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    category: 'news360',
    language: 'hi',
    author: 'संपादकीय टीम, Soar Samachar',
    urlToImage: PRESET_IMAGES[0].url,
    mediaType: 'image', // 'image' or 'video'
    description: '',
    content: '',
    isBreaking: false,
    isFeatured: false,
    tagsInput: 'समाचार, SoarSamachar, पिथौरागढ़'
  });

  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [createdId, setCreatedId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Multer file upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Multer के माध्यम से अपलोड हो रहा है (Uploading via Multer)...');

    try {
      const result = await uploadMediaFile(file);
      if (result.success) {
        setFormData(prev => ({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('कृपया कम से कम शीर्षक और संक्षिप्त विवरण अवश्य भरें!');
      return;
    }

    const selectedCat = categories.find(c => c.slug === formData.category);

    const articlePayload = {
      title: formData.title,
      titleEn: formData.titleEn || formData.title,
      category: formData.category,
      categoryName: selectedCat ? selectedCat.nameHi : formData.category,
      categoryNameEn: selectedCat ? selectedCat.nameEn : formData.category,
      language: formData.language,
      author: formData.author,
      urlToImage: formData.urlToImage || PRESET_IMAGES[0].url,
      mediaType: formData.mediaType || 'image',
      description: formData.description,
      content: formData.content || formData.description,
      isBreaking: formData.isBreaking,
      isFeatured: formData.isFeatured,
      tags: formData.tagsInput ? formData.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean) : []
    };

    const newArticle = addNews(articlePayload);
    setCreatedId(newArticle.id);
  };

  return (
    <div className="admin-add-news">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">{t('admin_addNews')}</h2>
          <p className="text-muted small mb-0">नया लेख तैयार करें और Multer द्वारा छवि/वीडियो जोड़ें।</p>
        </div>
        <Link to="/admin/manage" className="btn btn-outline-secondary btn-sm">
          {t('admin_manageNews')}
        </Link>
      </div>

      {createdId ? (
        <div className="alert alert-success p-4 rounded shadow-sm text-center">
          <i className="bi bi-check-circle-fill text-success fs-1 mb-2 d-block"></i>
          <h4 className="fw-bold">{t('admin_saveSuccess')}</h4>
          <p className="text-muted">आपका लेख तुरंत पाठकों के लिए लाइव हो चुका है।</p>
          <div className="d-flex gap-3 justify-content-center mt-3">
            <Link to={`/news/${createdId}`} className="btn btn-danger">
              <i className="bi bi-eye me-1"></i> प्रकाशित खबर देखें
            </Link>
            <button
              onClick={() => {
                setCreatedId(null);
                setUploadStatus('');
                setFormData({
                  title: '',
                  titleEn: '',
                  category: 'news360',
                  language: 'hi',
                  author: 'संपादकीय टीम, Soar Samachar',
                  urlToImage: PRESET_IMAGES[0].url,
                  mediaType: 'image',
                  description: '',
                  content: '',
                  isBreaking: false,
                  isFeatured: false,
                  tagsInput: 'समाचार, SoarSamachar, पिथौरागढ़'
                });
              }}
              className="btn btn-outline-secondary"
            >
              + एक और खबर लिखें
            </button>
            <Link to="/admin" className="btn btn-outline-primary">
              डैशबोर्ड पर जाएं
            </Link>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0 bg-body-tertiary">
          <div className="card-body p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Title (Primary) */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    {t('admin_formTitle')} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="उदाहरण: उत्तराखंड में नए विकास कार्यों का शुभारंभ..."
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* English Title (Optional) */}
                <div className="col-12">
                  <label className="form-label fw-semibold small">
                    अंग्रेज़ी अनुवाद शीर्षक (English Headline - Optional)
                  </label>
                  <input
                    type="text"
                    name="titleEn"
                    className="form-control"
                    placeholder="Optional English headline for dual language mode..."
                    value={formData.titleEn}
                    onChange={handleChange}
                  />
                </div>

                {/* Category & Language */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('admin_formCategory')}</label>
                  <select
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map(cat => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.nameHi} / {cat.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('admin_formLang')}</label>
                  <select
                    name="language"
                    className="form-select"
                    value={formData.language}
                    onChange={handleChange}
                  >
                    <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
                    <option value="en">🇬🇧 English</option>
                  </select>
                </div>

                {/* Author */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('admin_formAuthor')}</label>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    placeholder="ब्यूरो रिपोर्ट / संवाददाता का नाम"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>

                {/* Tags */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">{t('admin_formTags')}</label>
                  <input
                    type="text"
                    name="tagsInput"
                    className="form-control"
                    placeholder="राजनीति, देहरादून, ब्रेकिंग"
                    value={formData.tagsInput}
                    onChange={handleChange}
                  />
                </div>

                {/* MULTER IMAGE & VIDEO UPLOAD SECTION */}
                <div className="col-12">
                  <div className="p-3 bg-body rounded border">
                    <label className="form-label fw-bold d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-cloud-arrow-up-fill text-danger fs-5"></i>
                      <span>छवि अथवा वीडियो अपलोड (Upload Image or Video via Multer)</span>
                    </label>

                    <div className="row g-3 align-items-center">
                      <div className="col-md-7">
                        <div className="input-group">
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
                        <div className="form-text small">
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
                          <span className="input-group-text bg-body-tertiary">URL:</span>
                          <input
                            type="text"
                            name="urlToImage"
                            className="form-control form-control-sm"
                            placeholder="https://... या /uploads/..."
                            value={formData.urlToImage}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Presets */}
                    <div className="mt-3 pt-2 border-top d-flex flex-wrap align-items-center gap-1">
                      <span className="small text-muted me-2">त्वरित छवियां (Presets):</span>
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, urlToImage: preset.url, mediaType: 'image' }));
                            setUploadStatus(`Preset चयनित: ${preset.label}`);
                          }}
                          className="btn btn-sm btn-outline-secondary py-0 px-2"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    {/* Live Media Preview: Image or Video */}
                    {formData.urlToImage && (
                      <div className="mt-3 p-2 bg-body-tertiary rounded border">
                        <div className="small fw-semibold text-muted mb-2 d-flex align-items-center justify-content-between">
                          <span>
                            {formData.mediaType === 'video' ? (
                              <><i className="bi bi-camera-video-fill text-danger me-1"></i> वीडियो पूर्वावलोकन (Live Video Preview):</>
                            ) : (
                              <><i className="bi bi-image-fill text-primary me-1"></i> छवि पूर्वावलोकन (Live Image Preview):</>
                            )}
                          </span>
                          <span className="badge bg-secondary text-uppercase">{formData.mediaType}</span>
                        </div>

                        {formData.mediaType === 'video' || /\.(mp4|webm|mkv|mov)$/i.test(formData.urlToImage) ? (
                          <div className="ratio ratio-16x9 rounded overflow-hidden bg-black" style={{ maxHeight: '240px' }}>
                            <video src={formData.urlToImage} controls className="w-100 h-100 object-fit-contain"></video>
                          </div>
                        ) : (
                          <img
                            src={formData.urlToImage}
                            alt="Media Preview"
                            style={{ maxHeight: '180px', width: 'auto', maxWidth: '100%', objectFit: 'cover', borderRadius: '6px' }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    {t('admin_formSummary')} <span className="text-danger">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="मुख्य खबर का 2-3 पंक्तियों में सारांश लिखें..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Full Content */}
                <div className="col-12">
                  <label className="form-label fw-bold">{t('admin_formContent')}</label>
                  <textarea
                    name="content"
                    rows="8"
                    className="form-control"
                    placeholder="खबर का विस्तृत विवरण और पैराग्राफ यहां लिखें..."
                    value={formData.content}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Toggles: Breaking & Featured */}
                <div className="col-md-6">
                  <div className="form-check form-switch p-3 bg-body rounded border">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isBreakingSwitch"
                      name="isBreaking"
                      checked={formData.isBreaking}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold ms-2" htmlFor="isBreakingSwitch">
                      <i className="bi bi-lightning-charge-fill text-danger me-1"></i>
                      {t('admin_formBreaking')}
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-check form-switch p-3 bg-body rounded border">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isFeaturedSwitch"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                    />
                    <label className="form-check-label fw-semibold ms-2" htmlFor="isFeaturedSwitch">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {t('admin_formFeatured')}
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="col-12 mt-4 pt-3 border-top d-flex gap-3">
                  <button type="submit" className="btn btn-danger px-4 py-2 fw-bold" disabled={uploading}>
                    <i className="bi bi-check2-circle me-1"></i> {t('admin_submitBtn')}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="btn btn-outline-secondary px-4 py-2"
                  >
                    {t('admin_cancelBtn')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNews;
