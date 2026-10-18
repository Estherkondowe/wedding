import SectionHeading from '../components/ui/SectionHeading';
import Divider from '../components/ui/Divider';
import './WeddingDetails.css';

function EventCard({ type, venue, time, address, mapSrc }) {
  return (
    <article className="event-card">
      <p className="event-card__type">{type}</p>
      <h2 className="event-card__venue">{venue}</h2>
      <div className="event-card__meta">
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Date</span>
          <span className="event-card__meta-value">Saturday, 7 November 2026</span>
        </div>
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Time</span>
          <span className="event-card__meta-value">{time}</span>
        </div>
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Address</span>
          <span className="event-card__meta-value">{address}</span>
        </div>
      </div>

      {/* Map embed or elegant placeholder */}
      <div className="event-card__map">
        {mapSrc ? (
          <iframe
            src={mapSrc}
            title={`Map to ${venue}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="event-card__map-placeholder" aria-label={`Location: ${address}`}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p>{address}</p>
            <p className="event-card__map-hint">Lilongwe, Malawi</p>
          </div>
        )}
      </div>
    </article>
  );
}

function PaletteChip({ name, hex, role }) {
  return (
    <div className="palette__chip">
      <span className="palette__swatch" style={{ backgroundColor: hex }} aria-hidden="true" />
      <span className="palette__name">{name}</span>
      <span className="palette__role">{role}</span>
    </div>
  );
}

export default function WeddingDetails() {
  return (
    <div className="details">

      <section className="section details__header">
        <div className="container--content">
          <SectionHeading
            label="7 November 2026"
            title="The Day"
            subtitle="Two celebrations. One day. A lifetime together."
          />
        </div>
      </section>

      {/* ── Events ───────────────────────────── */}
      <section className="section section--alt details__events">
        <div className="container--content">
          <div className="details__events-grid">
            <EventCard
              type="Ceremony"
              venue="Bride Tabernacle"
              time="8:00 AM"
              address="Mchesi, Lilongwe"
            />
            <div className="details__events-sep" aria-hidden="true">
              <span />
              <span className="details__events-dot" />
              <span />
            </div>
            <EventCard
              type="Reception"
              venue="Logos Ministries Gardens"
              time="1:00 PM"
              address="Lilongwe, Malawi"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── What to expect ───────────────────── */}
      <section className="section details__notes">
        <div className="container--text" style={{ textAlign: 'center' }}>
          <SectionHeading label="Good to Know" title="A few things" />
          <div className="details__notes-grid">
            <div className="details__note">
              <p className="details__note-title">Parking</p>
              <p className="details__note-body">Ample parking is available at both venues. Please arrive a few minutes early for the ceremony.</p>
            </div>
            <div className="details__note">
              <p className="details__note-title">Dress Code</p>
              <p className="details__note-body">Elegant attire in our wedding palette — chocolate brown, beige, or champagne — is warmly encouraged.</p>
            </div>
            <div className="details__note">
              <p className="details__note-title">Children</p>
              <p className="details__note-body">Children are welcome and will be cherished guests. Little ones are invited to celebrate with us.</p>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="line" />

      {/* ── Color palette ─────────────────────── */}
      <section className="section details__palette">
        <div className="container--content" style={{ textAlign: 'center' }}>
          <SectionHeading label="Wedding Colors" title="The Palette" />
          <div className="palette">
            <PaletteChip name="Chocolate Brown" hex="#4A2C1A" role="Primary" />
            <PaletteChip name="Beige"           hex="#F5EFE6" role="Background" />
            <PaletteChip name="Champagne"       hex="#D4AF7A" role="Accent" />
          </div>
        </div>
      </section>

    </div>
  );
}
