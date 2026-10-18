import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Story',   to: '/story' },
  { label: 'Details', to: '/details' },
  { label: 'RSVP',    to: '/rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  /* Add a subtle border once user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <nav className="navbar__inner" aria-label="Main navigation">

        {/* Monogram / wordmark */}
        <Link to="/" className="navbar__monogram" aria-label="Go to homepage">
          <span className="navbar__monogram-initials">M &amp; E</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link${location.pathname === to ? ' navbar__link--active' : ''}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`navbar__toggle${menuOpen ? ' navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
          <span className="navbar__toggle-bar" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__mobile-link${location.pathname === to ? ' navbar__mobile-link--active' : ''}`}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
