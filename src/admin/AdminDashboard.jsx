import { useState } from 'react';
import { useLang } from '../context/LangContext';
import AdminAnnouncements from './AdminAnnouncements';
import AdminGallery from './AdminGallery';
import AdminBanners from './AdminBanners';
import AdminManager from './AdminManager';
import AdminSettings from './AdminSettings';
import './AdminDashboard.css';

const tabs = [
  { id: 'announcements', icon: '📢' },
  { id: 'gallery', icon: '🖼️' },
  { id: 'banners', icon: '🎯' },
  { id: 'manager', icon: '👤' },
  { id: 'settings', icon: '⚙️' },
];

export default function AdminDashboard({ onLogout }) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState('announcements');

  const tabLabels = {
    announcements: t('manageAnnouncements'),
    gallery: t('manageGallery'),
    banners: t('manageBanners'),
    manager: t('manageManager'),
    settings: t('settings'),
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'announcements': return <AdminAnnouncements />;
      case 'gallery': return <AdminGallery />;
      case 'banners': return <AdminBanners />;
      case 'manager': return <AdminManager />;
      case 'settings': return <AdminSettings />;
      default: return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-inner">
            <h2>🛠️ {t('adminPanel')}</h2>
            <button className="btn btn-sm btn-danger" onClick={onLogout}>
              {t('logout')}
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="admin-tab-icon">{tab.icon}</span>
              <span className="admin-tab-label">{tabLabels[tab.id]}</span>
            </button>
          ))}
        </div>
        <div className="admin-content">
          {renderTab()}
        </div>
      </div>
    </div>
  );
}
