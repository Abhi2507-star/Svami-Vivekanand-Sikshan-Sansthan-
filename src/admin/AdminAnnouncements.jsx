import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export default function AdminAnnouncements() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useData();
  const { t } = useLang();
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState('');
  const emptyForm = { title: '', titleHi: '', description: '', descriptionHi: '', date: new Date().toISOString().split('T')[0], pinned: false };
  const [form, setForm] = useState(emptyForm);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const handleSave = () => {
    if (!form.title) return;
    if (editing) {
      updateAnnouncement(editing, form);
    } else {
      addAnnouncement(form);
    }
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    showToast(t('saved'));
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, titleHi: item.titleHi || '', description: item.description, descriptionHi: item.descriptionHi || '', date: item.date, pinned: item.pinned });
    setEditing(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('confirmDelete'))) {
      deleteAnnouncement(id);
      showToast('Deleted!');
    }
  };

  return (
    <div>
      <div className="admin-section-title">
        <h3>📢 {t('manageAnnouncements')}</h3>
        {!showForm && (
          <button className="btn btn-primary btn-sm" onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}>
            {t('addNew')}
          </button>
        )}
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
      {showForm && (
        <div className="admin-form">
          <div className="form-group">
            <label className="form-label">{t('title')} (English)</label>
            <input className="form-input" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('title')} (Hindi)</label>
            <input className="form-input" value={form.titleHi} onChange={(e) => setForm({...form, titleHi: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('description')} (English)</label>
            <textarea className="form-textarea" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('description')} (Hindi)</label>
            <textarea className="form-textarea" value={form.descriptionHi} onChange={(e) => setForm({...form, descriptionHi: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">{t('date')}</label>
            <input type="date" className="form-input" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} />
          </div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({...form, pinned: e.target.checked})} />
              📌 {t('isPinned')}
            </label>
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-primary" onClick={handleSave}>{t('save')}</button>
            <button className="btn btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>{t('cancel')}</button>
          </div>
        </div>
      )}
      <div className="admin-list">
        {announcements.map((item) => (
          <div key={item.id} className="admin-list-item">
            <div className="admin-list-item-info">
              <h4>{item.pinned ? '📌 ' : ''}{item.title}</h4>
              <p>{item.date} — {item.description?.substring(0, 80)}...</p>
            </div>
            <div className="admin-list-item-actions">
              <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(item)}>{t('edit')}</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>{t('delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
