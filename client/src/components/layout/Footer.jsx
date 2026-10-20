import { Link } from 'react-router-dom';
import { COUPLE, DATE_LINE, CITY } from '../../data/wedding';
import './Footer.css';

const FOOTER_LINKS = [
  { label: 'Story',   to: '/story' },
  { label: 'Details', to: '/details' },
  { label: 'RSVP',    to: '/rsvp' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        <p className="footer__names">{COUPLE.fullNames}</p>

        <span className="footer__divider" aria-hidden="true" />

        <p className="footer__date">
          <time dateTime="2026-11-07">{DATE_LINE}</time> · {CITY}
        </p>

        <nav aria-label="Footer">
          <ul className="footer__links" role="list">
            {FOOTER_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="footer__link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="footer__verse">
          &ldquo;Two are better than one.&rdquo; — Ecclesiastes 4:9
        </p>

      </div>
    </footer>
  );
}
