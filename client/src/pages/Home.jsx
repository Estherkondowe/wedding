import { Link } from 'react-router-dom';
import useCountdown from '../hooks/useCountdown';
import './Home.css';

const WEDDING_DATE = '2026-11-07T08:00:00';

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown__unit">
      <span className="countdown__number">{String(value).padStart(2, '0')}</span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <div className="home">

      {/* ── Hero ─────────────────────────────── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__inner">

          <p className="hero__eyebrow">We are getting married</p>

          <h1 className="hero__names">
            <span>Mirriam</span>
            <span className="hero__ampersand">&amp;</span>
            <span>Elias</span>
          </h1>

          <div className="hero__date-line" aria-label="Wedding date">
            <span className="hero__date-rule" aria-hidden="true" />
            <time className="hero__date" dateTime="2026-11-07">
              Saturday, 7 November 2026
            </time>
            <span className="hero__date-rule" aria-hidden="true" />
          </div>

          {/* Countdown */}
          <div className="countdown" role="timer" aria-label="Countdown to wedding">
            <CountdownUnit value={days}    label="Days"    />
            <span className="countdown__sep" aria-hidden="true">·</span>
            <CountdownUnit value={hours}   label="Hours"   />
            <span className="countdown__sep" aria-hidden="true">·</span>
            <CountdownUnit value={minutes} label="Minutes" />
            <span className="countdown__sep" aria-hidden="true">·</span>
            <CountdownUnit value={seconds} label="Seconds" />
          </div>

          <p className="hero__welcome">
            With grateful hearts and joyful spirits, we invite you to
            celebrate the beginning of our life together.
          </p>

          <div className="hero__actions">
            <Link to="/rsvp" className="btn btn--primary">Kindly RSVP</Link>
            <Link to="/details" className="btn btn--ghost">View Details</Link>
          </div>

        </div>

        {/* Decorative vertical rules */}
        <span className="hero__rule hero__rule--left"  aria-hidden="true" />
        <span className="hero__rule hero__rule--right" aria-hidden="true" />
      </section>

      {/* ── At a glance ─────────────────────── */}
      <section className="glance section" aria-label="Event overview">
        <div className="container">
          <div className="glance__grid">

            <div className="glance__item">
              <p className="glance__label">Ceremony</p>
              <p className="glance__venue">Bride Tabernacle</p>
              <p className="glance__detail">Mchesi · 8:00 AM</p>
            </div>

            <span className="glance__divider" aria-hidden="true" />

            <div className="glance__item">
              <p className="glance__label">Reception</p>
              <p className="glance__venue">Logos Ministries Gardens</p>
              <p className="glance__detail">1:00 PM</p>
            </div>

            <span className="glance__divider" aria-hidden="true" />

            <div className="glance__item">
              <p className="glance__label">Dress Code</p>
              <p className="glance__venue">Elegant Attire</p>
              <p className="glance__detail">Brown · Beige · Champagne</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
