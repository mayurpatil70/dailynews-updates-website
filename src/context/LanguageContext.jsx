import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  hi: {
    // Brand & Header
    siteTitle: 'Soar Samachar',
    tagline: 'खबर वही - जो सही',
    subTagline: 'पिथौरागढ़ | उत्तराखण्ड',
    newsBuzz: 'न्यूज़ बज़',
    breakingNews: 'ब्रेकिंग न्यूज़',
    weatherCity: 'पिथौरागढ़',
    searchPlaceholder: 'खबरें खोजें...',
    searchBtn: 'खोजें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    adminLogin: 'एडमिन लॉगिन',
    adminDashboard: 'एडमिन पैनल',

    // Navigation Categories
    nav_home: 'होम',
    nav_news360: 'न्यूज़ 360',
    nav_growthStory: 'Growth स्टोरी',
    nav_politics: 'PURE पॉलिटिक्स',
    nav_addaSpecial: 'Soar स्पेशल',
    nav_yourColumn: 'Your कॉलम',
    nav_explainer: 'एक्सप्लेनर',
    nav_more: 'अन्य श्रेणियां',
    nav_health: 'हेल्थ',
    nav_education: 'शिक्षा',
    nav_vidhayak: 'विधायक ट्रैकर',
    nav_sports: 'खेल',
    nav_entertainment: 'मनोरंजन',
    nav_world: 'विदेश',
    nav_viral: 'वायरल',
    nav_environment: 'पर्यावरण',
    nav_state: 'राज्य / उत्तराखंड',
    nav_tech: 'टेक्नोलॉजी',

    // Sections & Titles
    topHeadlines: 'प्रमुख सुर्खियां',
    latestNews: 'ताज़ा ख़बरें',
    trendingNow: 'ट्रेंडिंग न्यूज़',
    featuredStory: 'खास रिपोर्ट',
    categoryStories: 'श्रेणी की ख़बरें',
    popularPosts: 'सर्वाधिक पढ़ी गई',
    readMore: 'पूरी खबर पढ़ें',
    publishedOn: 'प्रकाशित:',
    byAuthor: 'लेखक:',
    share: 'शेयर करें',
    relatedNews: 'संबंधित ख़बरें',
    noNewsFound: 'इस श्रेणी में कोई खबर नहीं मिली।',
    backToHome: 'होम पेज पर वापस जाएं',
    filterByLanguage: 'भाषा अनुसार फ़िल्टर',
    allLanguages: 'सभी भाषाएँ',
    onlyHindi: 'केवल हिन्दी',
    onlyEnglish: 'Only English',

    // Footer & Static Pages
    aboutUs: 'हमारे बारे में',
    contactUs: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता नीति',
    termsConditions: 'नियम और शर्तें',
    disclaimer: 'अस्वीकरण',
    quickLinks: 'महत्वपूर्ण लिंक्स',
    categories: 'श्रेणियां',
    followUs: 'हमें फॉलो करें',
    newsletterTitle: 'न्यूज़लेटर सब्सक्राइब करें',
    newsletterSub: 'ताज़ा समाचार और विशेष विश्लेषण सीधे अपने इनबॉक्स में पाएं।',
    subscribeBtn: 'सब्सक्राइब',
    copyrightText: '© 2026 Soar Samachar (सोर समाचार). सर्वाधिकार सुरक्षित। केवल खबर, कोई एजेंडा नहीं।',

    // Admin UI
    admin_title: 'सोर समाचार - एडमिन पोर्टल',
    admin_subtitle: 'समाचार जोड़ें, संपादित करें और प्रबंधित करें',
    admin_addNews: 'नया समाचार जोड़ें',
    admin_manageNews: 'समाचार प्रबंधित करें',
    admin_dashboard: 'डैशबोर्ड',
    admin_logout: 'लॉगआउट',
    admin_totalArticles: 'कुल लेख',
    admin_breakingCount: 'ब्रेकिंग न्यूज़',
    admin_featuredCount: 'फीचर्ड खबरें',
    admin_categoriesCount: 'सक्रिय श्रेणियां',
    admin_formTitle: 'शीर्षक (Title)',
    admin_formCategory: 'श्रेणी (Category)',
    admin_formLang: 'भाषा (Language)',
    admin_formAuthor: 'लेखक का नाम (Author)',
    admin_formImageUrl: 'छवि URL (Image URL)',
    admin_formSummary: 'संक्षिप्त विवरण (Summary)',
    admin_formContent: 'पूर्ण समाचार सामग्री (Full Article Content)',
    admin_formBreaking: 'ब्रेकिंग न्यूज़ में दिखाएं (Show in Breaking News Ticker)',
    admin_formFeatured: 'मुख्य फीचर्ड में दिखाएं (Hero / Featured Story)',
    admin_formTags: 'टैग्स (Tags - अल्पविराम से अलग करें)',
    admin_submitBtn: 'समाचार प्रकाशित करें',
    admin_updateBtn: 'समाचार अपडेट करें',
    admin_cancelBtn: 'रद्द करें',
    admin_editAction: 'संपादित करें',
    admin_deleteAction: 'हटाएं',
    admin_viewLive: 'लाइव वेबसाइट देखें',
    admin_confirmDelete: 'क्या आप वाकई इस समाचार को हटाना चाहते हैं?',
    admin_saveSuccess: 'समाचार सफलतापूर्वक सहेजा गया!',
    admin_updateSuccess: 'समाचार सफलतापूर्वक अपडेट हुआ!',
    admin_deleteSuccess: 'समाचार हटा दिया गया!',
  },
  en: {
    // Brand & Header
    siteTitle: 'Soar Samachar',
    tagline: 'Khabar Wahi - Jo Sahi',
    subTagline: 'Pithoragarh | Uttarakhand',
    newsBuzz: 'News Buzz',
    breakingNews: 'Breaking News',
    weatherCity: 'Pithoragarh',
    searchPlaceholder: 'Search news...',
    searchBtn: 'Search',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    adminLogin: 'Admin Login',
    adminDashboard: 'Admin Portal',

    // Navigation Categories
    nav_home: 'Home',
    nav_news360: 'News 360',
    nav_growthStory: 'Growth Story',
    nav_politics: 'Pure Politics',
    nav_addaSpecial: 'Soar Special',
    nav_yourColumn: 'Your Column',
    nav_explainer: 'Explainer',
    nav_more: 'More Categories',
    nav_health: 'Health',
    nav_education: 'Education',
    nav_vidhayak: 'MLA Tracker',
    nav_sports: 'Sports',
    nav_entertainment: 'Entertainment',
    nav_world: 'World',
    nav_viral: 'Viral',
    nav_environment: 'Environment',
    nav_state: 'State / Uttarakhand',
    nav_tech: 'Technology',

    // Sections & Titles
    topHeadlines: 'Top Headlines',
    latestNews: 'Latest Stories',
    trendingNow: 'Trending News',
    featuredStory: 'Special Spotlight',
    categoryStories: 'Category Stories',
    popularPosts: 'Most Read',
    readMore: 'Read Full Story',
    publishedOn: 'Published:',
    byAuthor: 'By:',
    share: 'Share',
    relatedNews: 'Related Stories',
    noNewsFound: 'No news found in this category.',
    backToHome: 'Return to Home',
    filterByLanguage: 'Filter by Language',
    allLanguages: 'All Languages',
    onlyHindi: 'केवल हिन्दी',
    onlyEnglish: 'English Only',

    // Footer & Static Pages
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
    disclaimer: 'Disclaimer',
    quickLinks: 'Quick Links',
    categories: 'Categories',
    followUs: 'Follow Us',
    newsletterTitle: 'Subscribe to Newsletter',
    newsletterSub: 'Get exclusive investigative reports and daily briefs in your inbox.',
    subscribeBtn: 'Subscribe',
    copyrightText: '© 2026 Soar Samachar. All Rights Reserved. Only News No Agenda.',

    // Admin UI
    admin_title: 'Soar Samachar - Admin Portal',
    admin_subtitle: 'Create, Edit and Manage News Articles',
    admin_addNews: 'Add New Article',
    admin_manageNews: 'Manage Articles',
    admin_dashboard: 'Dashboard',
    admin_logout: 'Logout',
    admin_totalArticles: 'Total Articles',
    admin_breakingCount: 'Breaking News',
    admin_featuredCount: 'Featured Stories',
    admin_categoriesCount: 'Active Categories',
    admin_formTitle: 'Headline / Title',
    admin_formCategory: 'Category',
    admin_formLang: 'Article Language',
    admin_formAuthor: 'Author Name',
    admin_formImageUrl: 'Cover Image URL',
    admin_formSummary: 'Summary / Short Excerpt',
    admin_formContent: 'Full Article Content',
    admin_formBreaking: 'Show in Breaking News Ticker',
    admin_formFeatured: 'Highlight as Featured Story',
    admin_formTags: 'Tags (comma separated)',
    admin_submitBtn: 'Publish Article',
    admin_updateBtn: 'Update Article',
    admin_cancelBtn: 'Cancel',
    admin_editAction: 'Edit',
    admin_deleteAction: 'Delete',
    admin_viewLive: 'View Live Site',
    admin_confirmDelete: 'Are you sure you want to delete this article?',
    admin_saveSuccess: 'Article published successfully!',
    admin_updateSuccess: 'Article updated successfully!',
    admin_deleteSuccess: 'Article deleted successfully!',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('newsadda-lang') || 'hi';
    } catch (e) {
      return 'hi';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('newsadda-lang', language);
      document.documentElement.setAttribute('lang', language);
    } catch (e) {}
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
