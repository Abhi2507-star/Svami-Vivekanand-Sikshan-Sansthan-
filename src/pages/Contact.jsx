import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';
import './Contact.css';

export default function Contact() {
  const { addContactMessage } = useData();
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    addContactMessage(form);
    setSent(true);
    setForm({ name: '', phone: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('getInTouch')}</h1>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-panel">
              <div className="contact-info-card">
                <div className="contact-info-item">
                  <span className="ci-icon">📞</span>
                  <div>
                    <h4>{t('phone')}</h4>
                    <a href="tel:+919838226955">{t('phoneText')}</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="ci-icon">📧</span>
                  <div>
                    <h4>{t('email')}</h4>
                    <a href="mailto:info@ptlaltaprasadschool.edu.in">{t('emailText')}</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="ci-icon">📍</span>
                  <div>
                    <h4>{t('address')}</h4>
                    <p>{t('addressText')}</p>
                  </div>
                </div>
              </div>

              <div className="contact-map">
                <iframe
                  title="School Location"
                  src="https://maps.google.com/maps?q=26.0637875,82.4254219&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="contact-map-iframe"
                  loading="lazy"
                ></iframe>
              </div>

            </div>

            <div className="contact-form-panel">
              <h3>{t('sendMessage')}</h3>
              {sent && <div className="form-success">{t('messageSent')}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{t('yourName')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('phoneNumber')}</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('yourMessage')}</label>
                  <textarea
                    className="form-textarea"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  {t('sendMessage')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
