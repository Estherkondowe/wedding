import { Link } from 'react-router-dom';
import useCountdown from '../hooks/useCountdown';
import usePageTitle from '../hooks/usePageTitle';
import { COUPLE, CEREMONY_START, DATE_LINE, DATE_ISO, CEREMONY, RECEPTION, DRESS_CODE, PHOTOS } from '../data/wedding';
import './Home.css';

function CountdownUnit({ value, label }) {
  return (
    <div className="countdown__unit">
      <span className="countdown__number">{String(value).padStart(2, '0')}</span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

export default function Home() {
  usePageTitle('');
  const { days, hours, minutes, seconds, isDone } = useCountdown(CEREMONY_START);

  return (
    <div className="home">

      {/* ── Hero ─────────────────────────────── */}
      <section className="hero">
        <img
          className="hero__bg"
          src={PHOTOS.hero}
          alt={`${COUPLE.fullNames} together`}
          fetchpriority="high"
          decoding="async"
        />
        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__inner">

          <p className="hero__eyebrow">We are getting married</p>

          <h1 className="hero__names">
            <span>{COUPLE.nameA}</span>
            <span className="hero__ampersand">&amp;</span>
            <span>{COUPLE.nameB}</span>
          </h1>

          <div className="hero__date-line">
            <span className="hero__date-rule" aria-hidden="true" />
            <time className="hero__date" dateTime={DATE_ISO}>
              {DATE_LINE}
            </time>
            <span className="hero__date-rule" aria-hidden="true" />
          </div>

          {/* Countdown */}
          {isDone ? (
            <p className="hero__today">The day is here — we marry today.</p>
          ) : (
            <div className="countdown" role="timer" aria-label="Countdown to the wedding">
              <CountdownUnit value={days}    label="Days"    />
              <span className="countdown__sep" aria-hidden="true">·</span>
              <CountdownUnit value={hours}   label="Hours"   />
              <span className="countdown__sep" aria-hidden="true">·</span>
              <CountdownUnit value={minutes} label="Minutes" />
              <span className="countdown__sep" aria-hidden="true">·</span>
              <CountdownUnit value={seconds} label="Seconds" />
            </div>
          )}

          <p className="hero__welcome">
            With grateful hearts and joyful spirits, we invite you to
            celebrate the beginning of our life together.
          </p>

          <div className="hero__actions">
            <Link to="/rsvp" className="btn btn--primary">Kindly RSVP</Link>
            <Link to="/details" className="btn btn--ghost-light">View Details</Link>
          </div>

        </div>
      </section>

      {/* ── At a glance ─────────────────────── */}
      <section className="glance section" aria-label="Event overview" >
        <div className="container">
          <div className="glance__grid">

            <div className="glance__item">
              <p className="glance__label">Ceremony</p>
              <p className="glance__venue">{CEREMONY.venue}</p>
              <p className="glance__detail">{CEREMONY.area} · {CEREMONY.time}</p>
            </div>

            <span className="glance__divider" aria-hidden="true" />

            <div className="glance__item">
              <p className="glance__label">Reception</p>
              <p className="glance__venue">{RECEPTION.venue}</p>
              <p className="glance__detail">{RECEPTION.time}</p>
            </div>

            <span className="glance__divider" aria-hidden="true" />

            <div className="glance__item">
              <p className="glance__label">Dress Code</p>
              <p className="glance__venue">Elegant Attire</p>
              <p className="glance__detail">Brown · Beige · Champagne</p>
            </div>

          </div>

          <p className="glance__cta">
            <Link to="/details" className="glance__cta-link">Full schedule &amp; venue details →</Link>
          </p>
        </div>
      </section>

    </div>
  );
}

