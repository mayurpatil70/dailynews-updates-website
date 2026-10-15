import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialNewsData, categoriesList } from '../data/initialNewsData';

const NewsContext = createContext();

const STORAGE_KEY = 'soarsamachar-articles-v1';

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading news from localStorage:', e);
    }
    return initialNewsData;
  });

  const [categories] = useState(categoriesList);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Error saving news to localStorage:', e);
    }
  }, [articles]);

  const addNews = (newArticle) => {
    const createdArticle = {
      id: `news-${Date.now()}`,
      publishedAt: new Date().toISOString(),
      views: 0,
      tags: newArticle.tags || [],
      isBreaking: !!newArticle.isBreaking,
      isFeatured: !!newArticle.isFeatured,
      language: newArticle.language || 'hi',
      ...newArticle
    };

    setArticles(prev => [createdArticle, ...prev]);
    return createdArticle;
  };

  const updateNews = (id, updatedData) => {
    setArticles(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updatedData, updatedAt: new Date().toISOString() } : item))
    );
  };

  const deleteNews = (id) => {
    setArticles(prev => prev.filter(item => item.id !== id));
  };

  const toggleBreaking = (id) => {
    setArticles(prev =>
      prev.map(item => (item.id === id ? { ...item, isBreaking: !item.isBreaking } : item))
    );
  };

  const toggleFeatured = (id) => {
    setArticles(prev =>
      prev.map(item => (item.id === id ? { ...item, isFeatured: !item.isFeatured } : item))
    );
  };

  const getNewsById = (id) => {
    return articles.find(item => item.id === id || String(item.id) === String(id));
  };

  const getNewsByCategory = (categorySlug) => {
    if (!categorySlug || categorySlug === 'all') return articles;
    return articles.filter(item => item.category === categorySlug);
  };

  const getBreakingNews = () => {
    const breaking = articles.filter(item => item.isBreaking);
    return breaking.length > 0 ? breaking : articles.slice(0, 5);
  };

  const getFeaturedNews = () => {
    const featured = articles.filter(item => item.isFeatured);
    return featured.length > 0 ? featured : articles.slice(0, 4);
  };

  const resetToDefaults = () => {
    setArticles(initialNewsData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        categories,
        addNews,
        updateNews,
        deleteNews,
        toggleBreaking,
        toggleFeatured,
        getNewsById,
        getNewsByCategory,
        getBreakingNews,
        getFeaturedNews,
        resetToDefaults
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
