import { createContext, useContext, useState, useCallback } from 'react';
import {
  defaultAnnouncements,
  defaultFacilities,
  defaultGallery,
  defaultManager,
  defaultBanners,
  defaultSectionVisibility,
  defaultContactMessages,
} from '../data/defaults';

const DataContext = createContext();

const STORAGE_PREFIX = 'plps_';

function loadData(key, fallback) {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

export function DataProvider({ children }) {
  const [announcements, setAnnouncements] = useState(() => loadData('announcements', defaultAnnouncements));
  const [facilities, setFacilities] = useState(() => loadData('facilities', defaultFacilities));
  const [gallery, setGallery] = useState(() => loadData('gallery', defaultGallery));
  const [manager, setManager] = useState(() => loadData('manager', defaultManager));
  const [banners, setBanners] = useState(() => loadData('banners', defaultBanners));
  const [sectionVisibility, setSectionVisibility] = useState(() => loadData('sectionVisibility', defaultSectionVisibility));
  const [contactMessages, setContactMessages] = useState(() => loadData('contactMessages', defaultContactMessages));

  // Announcements CRUD
  const addAnnouncement = useCallback((item) => {
    setAnnouncements((prev) => {
      const updated = [{ ...item, id: generateId() }, ...prev];
      saveData('announcements', updated);
      return updated;
    });
  }, []);

  const updateAnnouncement = useCallback((id, item) => {
    setAnnouncements((prev) => {
      const updated = prev.map((a) => (a.id === id ? { ...a, ...item } : a));
      saveData('announcements', updated);
      return updated;
    });
  }, []);

  const deleteAnnouncement = useCallback((id) => {
    setAnnouncements((prev) => {
      const updated = prev.filter((a) => a.id !== id);
      saveData('announcements', updated);
      return updated;
    });
  }, []);

  // Gallery CRUD
  const addGalleryImage = useCallback((item) => {
    setGallery((prev) => {
      const updated = [{ ...item, id: generateId() }, ...prev];
      saveData('gallery', updated);
      return updated;
    });
  }, []);

  const deleteGalleryImage = useCallback((id) => {
    setGallery((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveData('gallery', updated);
      return updated;
    });
  }, []);

  // Manager
  const updateManager = useCallback((data) => {
    setManager((prev) => {
      const updated = { ...prev, ...data };
      saveData('manager', updated);
      return updated;
    });
  }, []);

  // Banners
  const updateBanners = useCallback((data) => {
    setBanners((prev) => {
      const updated = { ...prev, ...data };
      saveData('banners', updated);
      return updated;
    });
  }, []);

  // Section Visibility
  const toggleSectionVisibility = useCallback((section) => {
    setSectionVisibility((prev) => {
      const updated = { ...prev, [section]: !prev[section] };
      saveData('sectionVisibility', updated);
      return updated;
    });
  }, []);

  // Contact Messages
  const addContactMessage = useCallback((msg) => {
    setContactMessages((prev) => {
      const updated = [{ ...msg, id: generateId(), date: new Date().toISOString() }, ...prev];
      saveData('contactMessages', updated);
      return updated;
    });
  }, []);

  const value = {
    announcements,
    facilities,
    gallery,
    manager,
    banners,
    sectionVisibility,
    contactMessages,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addGalleryImage,
    deleteGalleryImage,
    updateManager,
    updateBanners,
    toggleSectionVisibility,
    addContactMessage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
