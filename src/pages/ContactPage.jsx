import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-danger px-3 py-1 fs-6 mb-2">GET IN TOUCH</span>
          <h1 className="fw-bold display-6">{t('contactUs')}</h1>
          <p className="text-muted">कोई समाचार सूत्र (News Tip), प्रतिक्रिया या विज्ञापन संबंधी पूछताछ के लिए हमसे संपर्क करें।</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* Contact Details */}
          <div className="col-lg-4">
            <div className="bg-body-tertiary p-4 rounded border h-100">
              <h4 className="fw-bold mb-4 border-bottom pb-2">कार्यालय विवरण</h4>

              <div className="d-flex align-items-start gap-3 mb-4">
                <i className="bi bi-geo-alt-fill text-danger fs-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">प्रधान कार्यालय (सोर समाचार)</h6>
                  <p className="small text-muted mb-0">
                    मेन मार्केट, पिथौरागढ़ (उत्तराखण्ड) - 262501
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <i className="bi bi-envelope-fill text-danger fs-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">संपादकीय ईमेल</h6>
                  <p className="small text-muted mb-0">
                    contact@soarsamachar.com<br />
                    editor@soarsamachar.com
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 mb-4">
                <i className="bi bi-telephone-fill text-danger fs-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">हेल्पलाइन</h6>
                  <p className="small text-muted mb-0">
                    +91 5964 225432 / +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <i className="bi bi-clock-fill text-danger fs-3"></i>
                <div>
                  <h6 className="fw-bold mb-1">कार्य दिवस</h6>
                  <p className="small text-muted mb-0">
                    सोमवार - शनिवार: 09:00 पूर्वाह्न से 07:00 अपराह्न
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="bg-body-tertiary p-4 p-md-5 rounded border">
              <h4 className="fw-bold mb-3 border-bottom pb-2">संदेश भेजें</h4>

              {submitted ? (
                <div className="alert alert-success py-4 text-center">
                  <i className="bi bi-check-circle-fill fs-1 text-success d-block mb-2"></i>
                  <h5 className="fw-bold">आपका संदेश प्राप्त हो गया है!</h5>
                  <p className="small mb-0 text-muted">Soar Samachar (सोर समाचार) टीम जल्द ही आपके ईमेल पर संपर्क करेगी।</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">पूरा नाम *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="आपका नाम"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">ईमेल पता *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">मोबाइल नंबर</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">विषय</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="संदेश का विषय"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-semibold">आपका संदेश या समाचार सूत्र *</label>
                      <textarea
                        name="message"
                        rows="5"
                        className="form-control"
                        placeholder="कृपया अपना संदेश या खबर का ब्योरा यहां लिखें..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-danger px-4 py-2 fw-bold">
                        <i className="bi bi-send-fill me-1"></i> संदेश भेजें
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
