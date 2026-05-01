import { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export default function AdminManager() {
  const { manager, updateManager } = useData();
  const { t } = useLang();
  const [form, setForm] = useState({ ...manager });
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);

  const showToast = () => { setToast(t('saved')); setTimeout(() => setToast(''), 2000); };

  const handleSave = () => {
    updateManager(form);
    showToast();
  };

  const handlePhoto = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm({ ...form, photo: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="admin-section-title">
        <h3>👤 {t('manageManager')}</h3>
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
      <div className="admin-form">
        <div className="form-group">
          <label className="form-label">{t('name')} (English)</label>
          <input className="form-input" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('name')} (Hindi)</label>
          <input className="form-input" value={form.nameHi} onChange={(e) => setForm({...form, nameHi: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('designation')} (English)</label>
          <input className="form-input" value={form.designation} onChange={(e) => setForm({...form, designation: e.target.value})} />
        </div>
        <div className="form-group">
          <label className="form-label">{t('message')} (English)</label>
          <textarea className="form-textarea" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows="4" />
        </div>
        <div className="form-group">
          <label className="form-label">{t('message')} (Hindi)</label>
          <textarea className="form-textarea" value={form.messageHi} onChange={(e) => setForm({...form, messageHi: e.target.value})} rows="4" />
        </div>
        <div className="form-group">
          <label className="form-label">{t('photo')}</label>
          <div className="upload-area" onClick={() => fileRef.current?.click()}>
            <span className="upload-area-icon">📷</span>
            <p>{t('dragDrop')}</p>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handlePhoto(e.target.files[0])} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>{t('save')}</button>
      </div>
      <div className="admin-preview">
        <p className="admin-preview-title">{t('preview')}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={form.photo} alt={form.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h4>{form.name}</h4>
            <p style={{ color: 'var(--saffron)', fontSize: 'var(--font-size-sm)' }}>{form.designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
