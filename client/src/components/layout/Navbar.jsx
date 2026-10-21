import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COUPLE } from '../../data/wedding';
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
  const toggleRef = useRef(null);
  const wasOpen = useRef(false);
  /* Track scroll position before locking so we can restore it */
  const scrollY = useRef(0);

  /* Add a subtle border once user scrolls */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on route change + move focus to main content */
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  /* Lock body scroll while menu is open.
     overflow:hidden alone does not prevent scroll on iOS Safari — we must
     also use position:fixed and compensate with a negative top equal to the
     current scroll offset, then restore it on close. */
  useEffect(() => {
    if (menuOpen) {
      scrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top      = `-${scrollY.current}px`;
      document.body.style.width    = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      if (scrollY.current) window.scrollTo(0, scrollY.current);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* Escape closes the menu and returns focus to the toggle */
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current && toggleRef.current) toggleRef.current.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const isCurrent = (to) => location.pathname === to;

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Main navigation">

        {/* Monogram / wordmark */}
        <Link to="/" className="navbar__monogram" aria-label="Go to homepage">
          <span className="navbar__monogram-initials">{COUPLE.initials}</span>
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                aria-current={isCurrent(to) ? 'page' : undefined}
                className={
                  `navbar__link${isCurrent(to) ? ' navbar__link--active' : ''}` +
                  `${to === '/rsvp' ? ' navbar__link--cta' : ''}`
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
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
       inert={!menuOpen ? '' : undefined}
      >
        <ul role="list">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                aria-current={isCurrent(to) ? 'page' : undefined}
                className={`navbar__mobile-link${location.pathname === to ? ' navbar__mobile-link--active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}