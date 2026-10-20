import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

/* Scroll-to-top + scroll-reveal engine.
   Re-observes on route change so newly mounted sections animate in. */
export default function Layout({ children }) {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  /* Reset scroll on navigation (not on first load, so #anchors work) */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  /* Reveal-on-scroll */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
