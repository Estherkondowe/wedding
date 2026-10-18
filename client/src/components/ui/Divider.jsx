import './Divider.css';

/**
 * Divider
 * @param {'line'|'ornament'} variant
 */
export default function Divider({ variant = 'ornament' }) {
  if (variant === 'line') {
    return <hr className="divider divider--line" aria-hidden="true" />;
  }

  return (
    <div className="divider divider--ornament" aria-hidden="true">
      <span className="divider__line" />
      <span className="divider__diamond" />
      <span className="divider__line" />
    </div>
  );
}
