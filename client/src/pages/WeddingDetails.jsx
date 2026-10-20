import SectionHeading from '../components/ui/SectionHeading';
import Divider from '../components/ui/Divider';
import MapEmbed from '../components/ui/MapEmbed';
import usePageTitle from '../hooks/usePageTitle';
import {
  CEREMONY, RECEPTION, SCHEDULE, PALETTE, DATE_LINE,
  CEREMONY_START, CEREMONY_END, RECEPTION_START, RECEPTION_END,
} from '../data/wedding';
import './WeddingDetails.css';

function EventCard({ event }) {
  return (
    <article className="event-card">
      <p className="event-card__type">{event.type}</p>
      <h2 className="event-card__venue">{event.venue}</h2>
      <div className="event-card__meta">
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Date</span>
          <span className="event-card__meta-value">{DATE_LINE}</span>
        </div>
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Time</span>
          <span className="event-card__meta-value">{event.time}</span>
        </div>
        <div className="event-card__meta-item">
          <span className="event-card__meta-label">Address</span>
          <span className="event-card__meta-value">{event.address}</span>
        </div>
      </div>

      <MapEmbed embedSrc={event.mapsEmbed} mapsUrl={event.mapsUrl} venue={event.venue} />
    </article>
  );
}

function ScheduleTimeline() {
  return (
    <ol className="timeline" data-reveal>
      {SCHEDULE.map(({ time, title, detail }) => (
        <li key={time} className="timeline__item">
          <span className="timeline__marker" aria-hidden="true" />
          <div className="timeline__time">{time}</div>
          <div className="timeline__body">
            <p className="timeline__title">{title}</p>
            <p className="timeline__detail">{detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function toIcsDate(iso) {
  /* Convert to UTC: 2026-11-07T06:00:00.000Z -> 20261107T060000Z */
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function downloadIcs() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mirriam and Elia//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:ceremony-20261107@mirriamandelia',
    `DTSTART:${toIcsDate(CEREMONY_START)}`,
    `DTEND:${toIcsDate(CEREMONY_END)}`,
    `SUMMARY:Wedding Ceremony — ${CEREMONY.venue}`,
    `LOCATION:${CEREMONY.venue}\\, ${CEREMONY.address}`,
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:reception-20261107@mirriamandelia',
    `DTSTART:${toIcsDate(RECEPTION_START)}`,
    `DTEND:${toIcsDate(RECEPTION_END)}`,
    `SUMMARY:Wedding Reception — ${RECEPTION.venue}`,
    `LOCATION:${RECEPTION.venue}\\, ${RECEPTION.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mirriam-and-elia-wedding.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function WeddingDetails() {
  usePageTitle('The Day');

  return (
    <div className="details">

      <section className="section details__header">
        <div className="container--content">
          <SectionHeading
            as="h1"
            label="7 November 2026"
            title="The Day"
            subtitle="Two celebrations. One day. A lifetime together."
          />
          <div className="details__header-actions">
            <button type="button" className="btn btn--ghost" onClick={downloadIcs}>
              Add to calendar
            </button>
          </div>
        </div>
      </section>

      {/* ── Events ───────────────────────────── */}
      <section className="section section--alt details__events">
        <div className="container--content">
          <div className="details__events-grid" data-reveal>
            <EventCard event={CEREMONY} />
            <div className="details__events-sep" aria-hidden="true">
              <span />
              <span className="details__events-dot" />
              <span />
            </div>
            <EventCard event={RECEPTION} />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── Schedule ─────────────────────────── */}
      <section className="section details__schedule">
        <div className="container--content">
          <SectionHeading
            label="Order of the Day"
            title="The Schedule"
            subtitle="From the first amen to the last dance."
          />
          <ScheduleTimeline />
        </div>
      </section>

      <Divider variant="line" />

      {/* ── What to expect ───────────────────── */}
      <section className="section details__notes">
        <div className="container--text text-center">
          <SectionHeading label="Good to Know" title="A few things" />
          <div className="details__notes-grid" data-reveal>
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
        <div className="container--content text-center">
          <SectionHeading label="Wedding Colors" title="The Palette" />
          <div className="palette" data-reveal>
            {PALETTE.map(({ name, hex, role }) => (
              <div key={hex} className="palette__chip">
                <span className="palette__swatch" style={{ backgroundColor: hex }} aria-hidden="true" />
                <span className="palette__name">{name}</span>
                <span className="palette__role">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
