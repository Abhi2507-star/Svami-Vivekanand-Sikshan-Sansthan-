import { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export default function AdminBanners() {
  const { banners, updateBanners } = useData();
  const { t } = useLang();
  const [form, setForm] = useState({ tagline: banners.tagline, taglineHi: banners.taglineHi });
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);

  const showToast = () => { setToast(t('saved')); setTimeout(() => setToast(''), 2000); };

  const handleSave = () => {
    updateBanners(form);
    showToast();
  };

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateBanners({ heroImage: e.target.result });
      showToast();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="admin-section-title">
        <h3>🎯 {t('manageBanners')}</h3>
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
      <div className="admin-form">
        <div className="form-group">
          <label className="form-label">{t('tagline')} (English)</label>
          <input className="form-input" value={form.tagline} onChange={(e) => setForm({...form, tagline: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('tagline')} (Hindi)</label>
          <input className="form-input" value={form.taglineHi} onChange={(e) => setForm({...form, taglineHi: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('heroImage')}</label>
          <div className="upload-area" onClick={() => fileRef.current?.click()}>
            <span className="upload-area-icon">🖼️</span>
            <p>{t('dragDrop')}</p>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImage(e.target.files[0])} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>{t('save')}</button>
      </div>
      <div className="admin-preview">
        <p className="admin-preview-title">{t('preview')}</p>
        <img src={banners.heroImage} alt="Hero" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />
        <p style={{ marginTop: 8, fontWeight: 600 }}>{form.tagline}</p>
      </div>
    </div>
  );
}
