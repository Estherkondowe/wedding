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
              mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.536511758266!2d33.7903485!3d-13.986171500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3002ac1cc47%3A0x1bef9ef53e26c3d7!2sBride%20Assembly%20Tabernacle%20~%20Mchesi%20~!5e0!3m2!1sen!2smw!4v1792361063491!5m2!1sen!2smw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
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
              mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.8541390166216!2d33.78255712847425!3d-13.993297197841523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3feb5636fbd%3A0x6e9ea65be49ee768!2sLogos%20Ministries!5e0!3m2!1sen!2smw!4v1792361404883!5m2!1sen!2smw" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
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
              <p className="details__note-body">Modest attire in our wedding palette — chocolate brown, beige, or champagne — is warmly encouraged.</p>
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
