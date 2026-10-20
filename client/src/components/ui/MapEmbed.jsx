import { useState } from 'react';
import './MapEmbed.css';

/**
 * MapEmbed — click-to-load Google Maps facade.
 * Keeps the heavy Maps iframe off the page until the guest asks for it,
 * and always offers a plain "Open in Google Maps" link.
 */
export default function MapEmbed({ embedSrc, mapsUrl, venue }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map-embed">
      {loaded ? (
        <iframe
          src={embedSrc}
          title={`Map to ${venue}`}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-embed__facade">
          <svg className="map-embed__pin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <p className="map-embed__venue">{venue}</p>
          <div className="map-embed__actions">
            <button
              type="button"
              className="btn btn--ghost map-embed__btn"
              onClick={() => setLoaded(true)}
            >
              Show map
            </button>
            <a
              className="btn btn--ghost map-embed__btn"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
