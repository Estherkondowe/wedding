import SectionHeading from '../components/ui/SectionHeading';
import Photo from '../components/ui/Photo';
import Divider from '../components/ui/Divider';
import usePageTitle from '../hooks/usePageTitle';
import { COUPLE, PHOTOS } from '../data/wedding';
import './Story.css';

export default function Story() {
  usePageTitle('Our Story');

  return (
    <div className="story">

      {/* ── Header ───────────────────────────── */}
      <section className="section story__header">
        <div className="container--content">
          <SectionHeading
            as="h1"
            label="Our Story"
            title="How it all began"
          />
        </div>
      </section>

      {/* ── Main story ───────────────────────── */}
      <section className="section section--alt story__main">
        <div className="container--content">
          <div className="story__layout" data-reveal>

            {/* Text column */}
            <div className="story__text">
              <p className="story__pull">
                Some meetings are accidents. Theirs was anything but.
              </p>

              <p>
                Mirriam had returned to Lilongwe with purpose. After completing her
                nursing and midwifery training, she made the quiet, courageous decision
                to go back to school — this time to study Community Nursing at the
                College of Health Sciences. It was a season of discipline and becoming.
              </p>

              <p>
                On Sundays, she found rest at Bride Tabernacle in Mchesi — a church
                that would, unknowingly, become the backdrop of something far greater
                than she had planned for.
              </p>

              <p>
                That is where she and Elia first crossed paths. Something quiet
                took root in those early conversations — a recognition, perhaps,
                that the other person was worth paying attention to.
              </p>

              <p>
                What began in a church pew grew into a friendship, then into something
                neither of them could quite name, and eventually into a love they no
                longer wanted to keep to themselves.
              </p>

              <p className="story__closing">
                On the 7th of November 2026, they will stand in that same church
                and say what they have already known for some time: that they choose
                each other, completely and for good.
              </p>
            </div>

            {/* Portrait image */}
            <div className="story__portrait">
              <Photo
                src={PHOTOS.portrait}
                alt={`${COUPLE.fullNames} in a quiet moment together`}
                aspectRatio="3 / 4"
              />
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── Photo moments ───────────────────── */}
      <section className="section story__gallery">
        <div className="container--content" data-reveal>
          <p className="story__gallery-label">A few moments together</p>
          <div className="story__photos">
            <Photo
              src={PHOTOS.engagement}
              alt="The couple during their engagement"
              aspectRatio="4 / 3"
            />
            <Photo
              src={PHOTOS.couple}
              alt={`${COUPLE.fullNames} smiling together`}
              aspectRatio="3 / 4"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
