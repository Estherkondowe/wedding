import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        <p className="footer__names">Mirriam &amp; Elias</p>

        <span className="footer__divider" aria-hidden="true" />

        <p className="footer__date">Saturday, 7 November 2026</p>

        <p className="footer__verse">
          "Two are better than one." — Ecclesiastes 4:9
        </p>

      </div>
    </footer>
  );
}
