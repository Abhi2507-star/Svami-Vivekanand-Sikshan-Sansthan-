import { useData } from '../context/DataContext';
import { useLang } from '../context/LangContext';

export default function AdminSettings() {
  const { sectionVisibility, toggleSectionVisibility } = useData();
  const { t } = useLang();

  const sections = [
    { key: 'announcements', label: t('announcements') },
    { key: 'managerMessage', label: t('managersMessage') },
    { key: 'facilities', label: t('facilities') },
    { key: 'gallery', label: t('gallery') },
    { key: 'map', label: t('ourLocation') },
    { key: 'contact', label: t('contact') },
  ];

  return (
    <div>
      <div className="admin-section-title">
        <h3>⚙️ {t('sectionVisibility')}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-sm)' }}>
        Toggle sections on/off on the homepage.
      </p>
      {sections.map((s) => (
        <div key={s.key} className="toggle-row">
          <span className="toggle-row-label">{s.label}</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={sectionVisibility[s.key]}
              onChange={() => toggleSectionVisibility(s.key)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      ))}
    </div>
  );
}
