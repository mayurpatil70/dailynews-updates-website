import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="about-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {/* Header Banner */}
            <div className="text-center mb-5">
              <span className="badge bg-danger px-3 py-2 fs-6 mb-3">OUR MISSION</span>
              <h1 className="fw-bold display-6 mb-3">The News Adda</h1>
              <p className="lead text-danger fw-bold">ONLY NEWS NO AGENDA • केवल खबर, कोई एजेंडा नहीं</p>
            </div>

            <div className="bg-body-tertiary p-4 p-md-5 rounded border mb-4">
              <h3 className="fw-bold mb-3 border-start border-4 border-danger ps-3">हमारा परिचय</h3>
              <p className="fs-6 text-body lh-lg">
                <strong>The News Adda (thenewsadda.in)</strong> भारत का एक अग्रणी डिजिटल समाचार और विचार मंच है। हमारी स्थापना तथ्यपरक, निष्पक्ष और बेबाक पत्रकारिता को समर्पित दृष्टिकोण के साथ हुई है। आज के शोरगुल भरे मीडिया परिदृश्य में हमारा दृढ़ विश्वास है कि समाचार को किसी व्यक्तिगत या राजनीतिक एजेंडे से मुक्त होकर विशुद्ध रूप से जनता तक पहुंचना चाहिए।
              </p>
              <p className="fs-6 text-body lh-lg">
                हम उत्तराखंड, राष्ट्रीय राजनीति, अर्थव्यवस्था (Growth स्टोरी), जनसरोकार (Adda स्पेशल), खेल, स्वास्थ्य, तकनीकी नवाचार और वैचारिक विश्लेषणों पर गहरी व संतुलित रिपोर्टिंग प्रस्तुत करते हैं।
              </p>

              <div className="row g-4 my-3">
                <div className="col-md-4">
                  <div className="p-3 border rounded text-center bg-body">
                    <i className="bi bi-shield-check text-danger fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">100% निष्पक्ष</h5>
                    <p className="small text-muted mb-0">किसी भी पूर्वाग्रह के बिना प्रामाणिक तथ्यों पर आधारित रिपोर्टिंग।</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded text-center bg-body">
                    <i className="bi bi-bullseye text-danger fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">जनसरोकार प्रथम</h5>
                    <p className="small text-muted mb-0">नागरिकों की वास्तविक समस्याओं और जमीनी हकीकत को मंच।</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded text-center bg-body">
                    <i className="bi bi-speedometer2 text-danger fs-1 mb-2 d-block"></i>
                    <h5 className="fw-bold">द्रुत गति एवं शुद्धता</h5>
                    <p className="small text-muted mb-0">सत्यापित स्रोतों से त्वरित एवं सटीक समाचार प्रसारण।</p>
                  </div>
                </div>
              </div>

              <h4 className="fw-bold mt-4 mb-3 border-start border-4 border-danger ps-3">संपादकीय नीति (Editorial Ethics)</h4>
              <p className="fs-6 text-body lh-lg">
                The News Adda प्रेस काउंसिल ऑफ इंडिया (PCI) और डिजिटल न्यूज पब्लिशर्स एसोसिएशन के उच्चतम नैतिक दिशा-निर्देशों का अनुपालन करता है। हम किसी भी खबर को प्रकाशित करने से पूर्व उसके तथ्यों की स्वतंत्र पुष्टि करते हैं।
              </p>
            </div>

            <div className="text-center mt-4">
              <Link to="/contact-us" className="btn btn-danger px-4 py-2 fw-semibold me-2">
                {t('contactUs')}
              </Link>
              <Link to="/" className="btn btn-outline-secondary px-4 py-2 fw-semibold">
                {t('backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
