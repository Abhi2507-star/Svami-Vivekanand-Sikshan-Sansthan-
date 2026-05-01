import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Facilities.css';

export default function Facilities() {
  const { facilities } = useData();
  const { t, lang } = useLang();

  return (
    <div className="facilities-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('ourFacilities')}</h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <p className="facilities-subtitle">{t('facilitiesSubtitle')}</p>
          <div className="card-grid facilities-cards">
            {facilities.map((f) => (
              <div key={f.id} className="facility-detail-card card">
                <div className="card-body">
                  <span className="facility-detail-icon">{f.icon}</span>
                  <h3>{lang === 'hi' ? f.titleHi : f.title}</h3>
                  <p>{lang === 'hi' ? f.descriptionHi : f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
