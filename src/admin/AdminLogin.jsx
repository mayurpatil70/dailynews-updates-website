import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && (password === 'admin123' || password.length >= 4)) {
      localStorage.setItem('newsadda-admin-auth', 'true');
      localStorage.setItem('newsadda-admin-user', username);
      navigate('/admin');
    } else {
      setError('अमान्य उपयोगकर्ता नाम या पासवर्ड! (कृपया admin / admin123 का उपयोग करें)');
    }
  };

  return (
    <div className="admin-login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="text-center mb-4">
              <span className="badge bg-danger fs-6 p-2 px-3 fw-bold mb-2">NA ADMIN</span>
              <h2 className="fw-bold">The News Adda</h2>
              <p className="text-muted small">एडमिन पोर्टल • समाचार जोड़ें एवं प्रबंधित करें</p>
            </div>

            <div className="card shadow-lg border-0 bg-body-tertiary">
              <div className="card-body p-4 p-md-5">
                <h4 className="card-title fw-bold text-center mb-4">
                  <i className="bi bi-shield-lock-fill text-danger me-2"></i>
                  एडमिन प्रवेश (Admin Login)
                </h4>

                {error && (
                  <div className="alert alert-danger py-2 small" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-1"></i> {error}
                  </div>
                )}

                <div className="alert alert-info py-2 small mb-4">
                  <i className="bi bi-info-circle-fill me-1"></i> <strong>डेमो क्रेडेंशियल्स:</strong><br />
                  उपयोगकर्ता: <code>admin</code> | पासवर्ड: <code>admin123</code>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">उपयोगकर्ता नाम (Username)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-body border-end-0">
                        <i className="bi bi-person"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold">पासवर्ड (Password)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-body border-end-0">
                        <i className="bi bi-key"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control border-start-0"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-danger w-100 py-2 fw-bold mb-3">
                    <i className="bi bi-box-arrow-in-right me-1"></i> लॉगिन करें
                  </button>

                  <div className="text-center">
                    <Link to="/" className="text-decoration-none small text-muted">
                      ← मुख्य वेबसाइट पर वापस जाएं
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
