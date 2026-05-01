import { useState } from 'react';
import { useLang } from '../context/LangContext';
import AdminDashboard from './AdminDashboard';
import './AdminLogin.css';

const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const { t } = useLang();
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('plps_admin') === 'true');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('plps_admin', 'true');
      setIsLoggedIn(true);
      setError('');
    } else {
      setError(t('wrongPassword'));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('plps_admin');
    setIsLoggedIn(false);
    setPassword('');
  };

  if (isLoggedIn) return <AdminDashboard onLogout={handleLogout} />;

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">🔐</div>
        <h2>{t('adminPanel')}</h2>
        <p>{t('enterPassword')}</p>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            {t('login')}
          </button>
        </form>
      </div>
    </div>
  );
}
