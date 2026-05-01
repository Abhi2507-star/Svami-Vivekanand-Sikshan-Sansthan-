import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Gallery.css';

export default function Gallery() {
  const { gallery } = useData();
  const { t, lang } = useLang();
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const categories = ['all', 'events', 'campus', 'activities'];
  const categoryLabels = {
    all: t('all'),
    events: t('events'),
    campus: t('campus'),
    activities: t('activities'),
  };

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('schoolGallery')}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="gallery-empty">No images in this category.</p>
          ) : (
            <div className="gallery-grid">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="gallery-item"
                  onClick={() => setLightbox(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setLightbox(item)}
                >
                  <img
                    src={item.src}
                    alt={lang === 'hi' ? item.captionHi : item.caption}
                    loading="lazy"
                  />
                  <div className="gallery-item-overlay">
                    <p>{lang === 'hi' ? item.captionHi : item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lang === 'hi' ? lightbox.captionHi : lightbox.caption} />
            <p className="lightbox-caption">{lang === 'hi' ? lightbox.captionHi : lightbox.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
