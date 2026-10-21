import './Photo.css';

/**
 * Photo — responsive image in a fixed aspect-ratio frame.
 *
 * @param {string} src        — image URL (required)
 * @param {string} alt        — alt text (required for meaningful photos)
 * @param {string} aspectRatio — CSS aspect-ratio value (default: "3 / 4")
 * @param {string} loading    — "lazy" (default) or "eager"
 * @param {number} width      — intrinsic width hint (helps browser size-hint & CLS)
 * @param {number} height     — intrinsic height hint
 */
export default function Photo({
  src,
  alt,
  aspectRatio = '3 / 4',
  loading = 'lazy',
  width,
  height,
  className,
}) {
  return (
    <div className={`photo${className ? ` ${className}` : ''}`} style={{ aspectRatio }}>
      <img
        src={src}
        alt={alt}
        className="photo__img"
        loading={loading}
        decoding="async"
        {...(width  ? { width }  : {})}
        {...(height ? { height } : {})}
      />
    </div>
  );
}