import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { LangProvider } from './context/LangContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Announcements = lazy(() => import('./pages/Announcements'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}

function ScrollToTop() {
  // no-op: just a placeholder for scroll behavior
  return null;
}

export default function App() {
  return (
    <LangProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminLogin />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </BrowserRouter>
      </DataProvider>
    </LangProvider>
  );
}
