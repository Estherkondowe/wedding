import SectionHeading from '../components/ui/SectionHeading';
import useRSVP from '../hooks/useRSVP';
import './RSVP.css';

function RSVPSuccess({ name }) {
  return (
    <div className="rsvp-success">
      <span className="rsvp-success__icon" aria-hidden="true">✦</span>
      <h2 className="rsvp-success__title">Thank you, {name}.</h2>
      <p className="rsvp-success__body">
        Your RSVP has been received. We cannot wait to celebrate with you on
        the 7th of November.
      </p>
    </div>
  );
}

export default function RSVP() {
  const { fields, errors, status, apiError, handleChange, handleSubmit } = useRSVP();

  return (
    <div className="rsvp-page">

      {/* ── Header ───────────────────────────── */}
      <section className="section rsvp-page__header">
        <div className="container--text" style={{ textAlign: 'center' }}>
          <SectionHeading
            label="Kindly Reply"
            title="Will you join us?"
            subtitle="Please let us know by 31 October 2026 so we can make sure everything is just right."
          />
        </div>
      </section>

      {/* ── Contacts ─────────────────────────── */}
      <section className="section section--alt rsvp-page__contacts">
        <div className="container--content">
          <p className="rsvp-contacts__label">You may also reach us directly</p>
          <div className="rsvp-contacts">
            <div className="rsvp-contact">
              <span className="rsvp-contact__role">Mr Chirwa</span>
              <a href="tel:+265995979684" className="rsvp-contact__number">0995 979 684</a>
            </div>
            <span className="rsvp-contact__sep" aria-hidden="true" />
            <div className="rsvp-contact">
              <span className="rsvp-contact__role">Mr Kondowe</span>
              <a href="tel:+265999914961" className="rsvp-contact__number">0999 914 961</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────── */}
      <section className="section rsvp-page__form-section">
        <div className="container--text">

          {status === 'success' ? (
            <RSVPSuccess name={fields.full_name} />
          ) : (
            <form
              className="rsvp-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="RSVP form"
            >

              {/* Full Name */}
              <div className={`form-field${errors.full_name ? ' form-field--error' : ''}`}>
                <label className="form-field__label" htmlFor="full_name">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  className="form-field__input"
                  value={fields.full_name}
                  onChange={handleChange}
                  autoComplete="name"
                  aria-required="true"
                  aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                  placeholder="Your full name"
                />
                {errors.full_name && (
                  <p id="full_name-error" className="form-field__error" role="alert">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* Guest Count */}
              <div className={`form-field${errors.guest_count ? ' form-field--error' : ''}`}>
                <label className="form-field__label" htmlFor="guest_count">
                  Number of Guests <span aria-hidden="true">*</span>
                </label>
                <select
                  id="guest_count"
                  name="guest_count"
                  className="form-field__input form-field__select"
                  value={fields.guest_count}
                  onChange={handleChange}
                  aria-required="true"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
                {errors.guest_count && (
                  <p className="form-field__error" role="alert">{errors.guest_count}</p>
                )}
              </div>

              {/* Message */}
              <div className={`form-field${errors.message ? ' form-field--error' : ''}`}>
                <label className="form-field__label" htmlFor="message">
                  A message for the couple
                  <span className="form-field__optional"> — optional</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-field__input form-field__textarea"
                  value={fields.message}
                  onChange={handleChange}
                  rows={4}
                  maxLength={500}
                  aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                  placeholder="Share a wish or a prayer for Mirriam and Elias…"
                />
                <p id="message-hint" className="form-field__hint">
                  {fields.message.length}/500
                </p>
                {errors.message && (
                  <p id="message-error" className="form-field__error" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* API error */}
              {status === 'error' && apiError && (
                <p className="form-field__error form-error--api" role="alert">
                  {apiError}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--primary rsvp-form__submit"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Send RSVP'}
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
}
