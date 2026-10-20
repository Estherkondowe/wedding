import SectionHeading from '../components/ui/SectionHeading';
import useRSVP from '../hooks/useRSVP';
import usePageTitle from '../hooks/usePageTitle';
import { CONTACTS, RSVP_DEADLINE, COUPLE } from '../data/wedding';
import './RSVP.css';

function RSVPSuccess({ name, attending }) {
  return (
    <div className="rsvp-success">
      <span className="rsvp-success__icon" aria-hidden="true">✦</span>
      <h2 className="rsvp-success__title">Thank you, {name}.</h2>
      <p className="rsvp-success__body">
        {attending
          ? `Your RSVP has been received. We cannot wait to celebrate with you on the 7th of November.`
          : `We will miss you on the day — thank you for letting us know.`}
      </p>
    </div>
  );
}

function waLink(phoneRaw, text) {
  return `https://wa.me/${phoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export default function RSVP() {
  usePageTitle('RSVP');
  const { fields, errors, status, apiError, attending, handleChange, handleSubmit } = useRSVP();

  return (
    <div className="rsvp-page">

      {/* ── Header ───────────────────────────── */}
      <section className="section rsvp-page__header">
        <div className="container--text text-center">
          <SectionHeading
            as="h1"
            label="Kindly Reply"
            title="Will you join us?"
            subtitle={`Please let us know by ${RSVP_DEADLINE} so we can make sure everything is just right.`}
          />
        </div>
      </section>

      {/* ── Contacts ─────────────────────────── */}
      <section className="section section--alt rsvp-page__contacts">
        <div className="container--content">
          <p className="rsvp-contacts__label">You may also reach us directly</p>
          <div className="rsvp-contacts">
            {CONTACTS.map(({ role, phoneDisplay, phoneRaw }, i) => (
              <div key={phoneRaw} className="rsvp-contacts__group">
                {i > 0 && <span className="rsvp-contact__sep" aria-hidden="true" />}
                <div className="rsvp-contact">
                  <span className="rsvp-contact__role">{role}</span>
                  <span className="rsvp-contact__methods">
                    <a href={`tel:${phoneRaw}`} className="rsvp-contact__number">{phoneDisplay}</a>
                    <a
                      href={waLink(phoneRaw, `Hello ${role}, regarding ${COUPLE.fullNames}'s wedding on 7 November 2026…`)}
                      className="rsvp-contact__wa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ─────────────────────────────── */}
      <section className="section rsvp-page__form-section">
        <div className="container--text">

          {status === 'success' ? (
            <RSVPSuccess name={fields.full_name} attending={attending} />
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
                  aria-invalid={errors.full_name ? 'true' : undefined}
                  aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                  placeholder="Your full name"
                />
                {errors.full_name && (
                  <p id="full_name-error" className="form-field__error" role="alert">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* Attending */}
              <fieldset className={`form-field${errors.attending ? ' form-field--error' : ''}`}>
                <legend className="form-field__label">
                  Will you be with us? <span aria-hidden="true">*</span>
                </legend>
                <div className="form-field__radios">
                  <label className={`radio-chip${fields.attending === 'yes' ? ' radio-chip--selected' : ''}`}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={fields.attending === 'yes'}
                      onChange={handleChange}
                      className="radio-chip__input"
                    />
                    <span>Joyfully accepts</span>
                  </label>
                  <label className={`radio-chip${fields.attending === 'no' ? ' radio-chip--selected' : ''}`}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={fields.attending === 'no'}
                      onChange={handleChange}
                      className="radio-chip__input"
                    />
                    <span>Regretfully declines</span>
                  </label>
                </div>
                {errors.attending && (
                  <p id="attending-error" className="form-field__error" role="alert">{errors.attending}</p>
                )}
              </fieldset>

              {/* Guest Count — only when attending */}
              {attending && (
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
                    aria-invalid={errors.guest_count ? 'true' : undefined}
                    aria-describedby={errors.guest_count ? 'guest_count-error' : undefined}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                  {errors.guest_count && (
                    <p id="guest_count-error" className="form-field__error" role="alert">{errors.guest_count}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className={`form-field${errors.email ? ' form-field--error' : ''}`}>
                <label className="form-field__label" htmlFor="email">
                  Email
                  <span className="form-field__optional"> — optional</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-field__input"
                  value={fields.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                  placeholder="you@example.com"
                />
                <p id="email-hint" className="form-field__hint">Only used to confirm your RSVP.</p>
                {errors.email && (
                  <p id="email-error" className="form-field__error" role="alert">{errors.email}</p>
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
                  placeholder={`Share a wish or a prayer for ${COUPLE.fullNames}…`}
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

              {/* Honeypot — hidden from humans, tempting to bots */}
              <div className="form-field form-field--hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={fields.website}
                  onChange={handleChange}
                />
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
