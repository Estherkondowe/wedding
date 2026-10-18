import './ImagePlaceholder.css';

/**
 * ImagePlaceholder
 * Swap `src` prop in when real photos are available.
 *
 * @param {string} src    — photo URL (optional; shows placeholder when absent)
 * @param {string} alt    — alt text for real images
 * @param {string} label  — placeholder label (e.g. "Photo · 2023")
 * @param {string} aspectRatio — CSS aspect-ratio value (default: "3 / 4")
 */
export default function ImagePlaceholder({
  src,
  alt = '',
  label = 'Photo',
  aspectRatio = '3 / 4',
}) {
  return (
    <div className="img-placeholder" style={{ aspectRatio }}>
      {src ? (
        <img src={src} alt={alt} className="img-placeholder__img" loading="lazy" />
      ) : (
        <div className="img-placeholder__empty" aria-label={label}>
          <span className="img-placeholder__label">{label}</span>
        </div>
      )}
    </div>
  );
}
