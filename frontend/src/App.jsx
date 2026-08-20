import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import BookingPage from './pages/BookingPage';
import NotFoundPage from './pages/NotFoundPage';

const AppContent = ({ theme, toggleTheme }) => {
  const location = useLocation();

  // Check if current path is a valid page route
  const validRoutes = ['/', '/doctors', '/booking'];
  const isNotFoundPage = !validRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {/* Hide Navbar on 404 Page */}
      {!isNotFoundPage && <Navbar theme={theme} toggleTheme={toggleTheme} />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Hide Footer on 404 Page */}
      {!isNotFoundPage && <Footer />}
    </div>
  );
};

function App() {
  // Theme State with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <ScrollToTop />
      <AppContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
