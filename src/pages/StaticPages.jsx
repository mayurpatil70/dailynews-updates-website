import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 bg-body-tertiary p-4 p-md-5 rounded border">
          <h1 className="fw-bold mb-4">गोपनीयता नीति (Privacy Policy)</h1>
          <p className="text-muted small mb-4">अंतिम अद्यतन: 14 अक्टूबर 2026</p>

          <h5 className="fw-bold mt-4">1. सूचनाओं का संग्रहण</h5>
          <p className="text-body lh-lg">
            Soar Samachar (सोर समाचार) पर हम अपने पाठकों की निजता का पूर्ण सम्मान करते हैं। हमारी वेबसाइट पर सामान्य समाचार ब्राउज़ करने के लिए किसी व्यक्तिगत पहचान योग्य जानकारी की आवश्यकता नहीं होती है।
          </p>

          <h5 className="fw-bold mt-4">2. कुकीज़ और वेब बीकन्स</h5>
          <p className="text-body lh-lg">
            उपयोगकर्ता अनुभव को बेहतर बनाने, पसंदीदा थीम (डार्क/लाइट मोड) और भाषा (हिन्दी/अंग्रेज़ी) की प्राथमिकताओं को संजोने के लिए लोकल स्टोरेज और कुकीज़ का उपयोग किया जाता है।
          </p>

          <h5 className="fw-bold mt-4">3. डेटा सुरक्षा</h5>
          <p className="text-body lh-lg">
            हम किसी भी तीसरे पक्ष के साथ हमारे पाठकों की व्यक्तिगत जानकारी या ईमेल साझा अथवा बिक्री नहीं करते हैं। न्यूज़लेटर हेतु प्राप्त ईमेल को सुरक्षित एन्क्रिप्शन के तहत रखा जाता है।
          </p>

          <div className="mt-4 pt-3 border-top">
            <Link to="/" className="btn btn-danger btn-sm">
              होम पेज पर वापस जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsPage = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 bg-body-tertiary p-4 p-md-5 rounded border">
          <h1 className="fw-bold mb-4">नियम एवं शर्तें (Terms & Conditions)</h1>
          <p className="text-muted small mb-4">अंतिम अद्यतन: 14 अक्टूबर 2026</p>

          <h5 className="fw-bold mt-4">1. सामग्री का उपयोग</h5>
          <p className="text-body lh-lg">
            Soar Samachar पर प्रकाशित समस्त मूल रिपोर्ट, विश्लेषण, छायाचित्र एवं ग्राफिक्स का कॉपीराइट Soar Samachar के पास सुरक्षित है। गैर-व्यावसायिक संदर्भों में उचित साभार के साथ सामग्री उद्धृत की जा सकती है।
          </p>

          <h5 className="fw-bold mt-4">2. पाठकों की टिप्पणियां एवं आचार संहिता</h5>
          <p className="text-body lh-lg">
            मंच पर किसी भी प्रकार की असभ्य, मानहानिकारक अथवा गैरकानूनी सामग्री पोस्ट करना प्रतिबंधित है। संपादकीय टीम ऐसी टिप्पणियों को बिना किसी पूर्व सूचना के हटाने का अधिकार रखती है।
          </p>

          <h5 className="fw-bold mt-4">3. अधिकार क्षेत्र</h5>
          <p className="text-body lh-lg">
            किसी भी प्रकार के विधिक विवाद की स्थिति में न्यायिक क्षेत्राधिकार देहरादून, उत्तराखंड न्यायालय होगा।
          </p>

          <div className="mt-4 pt-3 border-top">
            <Link to="/" className="btn btn-danger btn-sm">
              होम पेज पर वापस जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
