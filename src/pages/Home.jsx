import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Home.css';

export default function Home() {
  const { announcements, manager, facilities, gallery, banners, sectionVisibility } = useData();
  const { t, lang } = useLang();
  const [managerExpanded, setManagerExpanded] = useState(false);

  const pinnedAnnouncements = announcements.filter((a) => a.pinned);
  const latestAnnouncements = announcements.slice(0, 3);
  const galleryPreview = gallery.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src={banners.heroImage} alt="School" loading="eager" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content container">
          <h1 className="hero-title">{t('schoolName')}</h1>
          <p className="hero-tagline">{lang === 'hi' ? banners.taglineHi : banners.tagline}</p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-lg">{t('admissions')}</Link>
            <Link to="/contact" className="btn btn-secondary btn-lg hero-btn-secondary">{t('contactUs')}</Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      {sectionVisibility.announcements && latestAnnouncements.length > 0 && (
        <section className="section" id="home-announcements">
          <div className="container">
            <div className="section-header">
              <h2>{t('latestUpdates')}</h2>
            </div>
            <div className="announcements-scroll">
              {latestAnnouncements.map((item) => (
                <div key={item.id} className="announcement-card card">
                  <div className="card-body">
                    <div className="announcement-card-header">
                      <span className="badge badge-saffron">{item.date}</span>
                      {item.pinned && <span className="badge badge-pinned">📌 {t('pinned')}</span>}
                    </div>
                    <h4>{lang === 'hi' ? item.titleHi : item.title}</h4>
                    <p>{lang === 'hi' ? item.descriptionHi : item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="section-action">
              <Link to="/announcements" className="btn btn-secondary">{t('viewAll')} →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Manager's Message */}
      {sectionVisibility.managerMessage && (
        <section className="section section-alt" id="manager-section">
          <div className="container">
            <div className="section-header">
              <h2>{t('managersMessage')}</h2>
            </div>
            <div className="manager-card">
              <div className="manager-photo-wrap">
                <img
                  src={manager.photo}
                  alt={lang === 'hi' ? manager.nameHi : manager.name}
                  className="manager-photo"
                  loading="lazy"
                />
                <h4 className="manager-name">{lang === 'hi' ? manager.nameHi : manager.name}</h4>
                <p className="manager-designation">{lang === 'hi' ? manager.designationHi : manager.designation}</p>
              </div>
              <div className="manager-message">
                <p className={managerExpanded ? '' : 'manager-message-truncated'}>
                  "{lang === 'hi' ? manager.messageHi : manager.message}"
                </p>
                <button
                  className="btn btn-sm btn-secondary manager-read-more"
                  onClick={() => setManagerExpanded(!managerExpanded)}
                >
                  {managerExpanded ? t('readLess') : t('readMore')}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Facilities */}
      {sectionVisibility.facilities && (
        <section className="section" id="home-facilities">
          <div className="container">
            <div className="section-header">
              <h2>{t('ourFacilities')}</h2>
              <p>{t('facilitiesSubtitle')}</p>
            </div>
            <div className="facilities-grid">
              {facilities.map((facility) => (
                <div key={facility.id} className="facility-card">
                  <span className="facility-icon">{facility.icon}</span>
                  <h4>{lang === 'hi' ? facility.titleHi : facility.title}</h4>
                </div>
              ))}
            </div>
            <div className="section-action">
              <Link to="/facilities" className="btn btn-secondary">{t('viewAll')} →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Preview */}
      {sectionVisibility.gallery && galleryPreview.length > 0 && (
        <section className="section section-alt" id="home-gallery">
          <div className="container">
            <div className="section-header">
              <h2>{t('schoolGallery')}</h2>
            </div>
            <div className="gallery-preview-grid">
              {galleryPreview.map((item) => (
                <div key={item.id} className="gallery-preview-item">
                  <img
                    src={item.src}
                    alt={lang === 'hi' ? item.captionHi : item.caption}
                    loading="lazy"
                  />
                  <div className="gallery-preview-caption">
                    {lang === 'hi' ? item.captionHi : item.caption}
                  </div>
                </div>
              ))}
            </div>
            <div className="section-action">
              <Link to="/gallery" className="btn btn-secondary">{t('viewFullGallery')} →</Link>
            </div>
          </div>
        </section>
      )}



      {/* Contact Strip */}
      {sectionVisibility.contact && (
        <section className="section section-alt" id="home-contact">
          <div className="container">
            <div className="contact-strip">
              <div className="contact-strip-item">
                <span className="contact-strip-icon">📞</span>
                <div>
                  <p className="contact-strip-label">{t('phone')}</p>
                  <a href="tel:+919838226955" className="contact-strip-value">{t('phoneText')}</a>
                </div>
              </div>
              <div className="contact-strip-item">
                <span className="contact-strip-icon">📧</span>
                <div>
                  <p className="contact-strip-label">{t('email')}</p>
                  <a href="mailto:info@ptlaltaprasadschool.edu.in" className="contact-strip-value">{t('emailText')}</a>
                </div>
              </div>
              <div className="contact-strip-item">
                <span className="contact-strip-icon">📍</span>
                <div>
                  <p className="contact-strip-label">{t('address')}</p>
                  <p className="contact-strip-value">{t('addressText')}</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
}
