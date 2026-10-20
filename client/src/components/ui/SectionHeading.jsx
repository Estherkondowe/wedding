import './SectionHeading.css';

/**
 * SectionHeading
 * @param {string}  label     — small overline text (optional)
 * @param {string}  title     — main heading text
 * @param {string}  subtitle  — optional paragraph beneath the title
 * @param {'left'|'center'} align — text alignment (default: center)
 * @param {'h1'|'h2'|'h3'} as — heading level (default: h2; use h1 for page titles)
 */
export default function SectionHeading({ label, title, subtitle, align = 'center', as = 'h2' }) {
  const Heading = as;
  return (
    <div className={`section-heading section-heading--${align}`}>
      {label && (
        <p className="section-heading__label">{label}</p>
      )}
      <Heading className="section-heading__title">{title}</Heading>
      {subtitle && (
        <p className="section-heading__subtitle">{subtitle}</p>
      )}
    </div>
  );
}
