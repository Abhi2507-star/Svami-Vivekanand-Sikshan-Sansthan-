import { useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export default function AdminGallery() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useData();
  const { t } = useLang();
  const fileRef = useRef(null);
  const [toast, setToast] = useState('');
  const [category, setCategory] = useState('campus');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2000); };

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        addGalleryImage({
          src: e.target.result,
          category,
          caption: file.name.replace(/\.[^.]+$/, ''),
          captionHi: file.name.replace(/\.[^.]+$/, ''),
        });
        showToast(t('saved'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('confirmDelete'))) {
      deleteGalleryImage(id);
      showToast('Deleted!');
    }
  };

  return (
    <div>
      <div className="admin-section-title">
        <h3>🖼️ {t('manageGallery')}</h3>
      </div>
      {toast && <div className="admin-toast">{toast}</div>}
      <div className="form-group">
        <label className="form-label">{t('category')}</label>
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="campus">Campus</option>
          <option value="events">Events</option>
          <option value="activities">Activities</option>
        </select>
      </div>
      <div
        className="upload-area"
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <span className="upload-area-icon">📁</span>
        <p>{t('dragDrop')}</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <div className="admin-image-grid">
        {gallery.map((item) => (
          <div key={item.id} className="admin-image-item">
            <img src={item.src} alt={item.caption} loading="lazy" />
            <button className="admin-image-delete" onClick={() => handleDelete(item.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
