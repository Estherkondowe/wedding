import './SectionHeading.css';

/**
 * SectionHeading
 * @param {string}  label     — small overline text (optional)
 * @param {string}  title     — main heading text
 * @param {string}  subtitle  — optional paragraph beneath the title
 * @param {'left'|'center'} align — text alignment (default: center)
 */
export default function SectionHeading({ label, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && (
        <p className="section-heading__label">{label}</p>
      )}
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && (
        <p className="section-heading__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
