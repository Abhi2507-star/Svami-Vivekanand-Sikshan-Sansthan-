import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, toggleLanguage } = useLang();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/gallery', label: t('gallery') },
    { to: '/announcements', label: t('announcements') },
    { to: '/facilities', label: t('facilities') },
    { to: '/contact', label: t('contact') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <img src="/images/logo.png" alt="Logo" className="navbar-logo-img" />
          <div className="navbar-brand-text">
            <span className="navbar-title">{t('schoolName')}</span>
          </div>
        </Link>

        <div className="navbar-actions">
          <button
            className="lang-toggle"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            title={lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
          >
            {lang === 'en' ? 'हि' : 'EN'}
          </button>

          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-menu-inner">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="navbar-link navbar-link-admin"
              onClick={() => setMenuOpen(false)}
            >
              {t('admin')}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />
        )}
      </div>
    </nav>
  );
}
