import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-brand">
              <span className="footer-logo">🏫</span>
              <h3>{t('schoolName')}</h3>
            </div>

          </div>

          <div className="footer-section">
            <h4>{t('quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/gallery">{t('gallery')}</Link></li>
              <li><Link to="/announcements">{t('announcements')}</Link></li>
              <li><Link to="/facilities">{t('facilities')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>{t('contactInfo')}</h4>
            <ul className="footer-contact">
              <li>
                <span>📞</span>
                <a href="tel:+919838226955">{t('phoneText')}</a>
              </li>
              <li>
                <span>📧</span>
                <a href="mailto:info@ptlaltaprasadschool.edu.in">{t('emailText')}</a>
              </li>
              <li>
                <span>📍</span>
                <span>{t('addressText')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('copyright')}</p>
          <p className="footer-love">{t('madeWith')}</p>
        </div>
      </div>
    </footer>
  );
}
