import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Announcements.css';

export default function Announcements() {
  const { announcements } = useData();
  const { t, lang } = useLang();

  const pinned = announcements.filter((a) => a.pinned);
  const regular = announcements.filter((a) => !a.pinned);

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('importantNotices')}</h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {pinned.length > 0 && (
            <div className="announcements-pinned">
              {pinned.map((item) => (
                <div key={item.id} className="ann-item ann-pinned card">
                  <div className="card-body">
                    <div className="ann-meta">
                      <span className="badge badge-pinned">📌 {t('pinned')}</span>
                      <span className="badge badge-saffron">{item.date}</span>
                    </div>
                    <h3>{lang === 'hi' ? item.titleHi : item.title}</h3>
                    <p>{lang === 'hi' ? item.descriptionHi : item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {regular.length > 0 && (
            <div className="announcements-list">
              {regular.map((item) => (
                <div key={item.id} className="ann-item card">
                  <div className="card-body">
                    <div className="ann-meta">
                      <span className="badge badge-saffron">{item.date}</span>
                    </div>
                    <h3>{lang === 'hi' ? item.titleHi : item.title}</h3>
                    <p>{lang === 'hi' ? item.descriptionHi : item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {announcements.length === 0 && (
            <p className="empty-state">{t('noAnnouncements')}</p>
          )}
        </div>
      </section>
    </div>
  );
}
