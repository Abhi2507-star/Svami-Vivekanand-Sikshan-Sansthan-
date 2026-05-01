import { NavLink } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './BottomNav.css';

export default function BottomNav() {
  const { t } = useLang();

  const tabs = [
    { to: '/', icon: '🏠', label: t('home') },
    { to: '/gallery', icon: '🖼️', label: t('gallery') },
    { to: '/announcements', icon: '📢', label: t('announcements') },
    { to: '/facilities', icon: '🏫', label: t('facilities') },
    { to: '/contact', icon: '📞', label: t('contact') },
  ];

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `bottom-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="bottom-nav-icon">{tab.icon}</span>
          <span className="bottom-nav-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
