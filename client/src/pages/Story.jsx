import SectionHeading from '../components/ui/SectionHeading';
import ImagePlaceholder from '../components/ui/ImagePlaceholder';
import Divider from '../components/ui/Divider';
import './Story.css';

export default function Story() {
  return (
    <div className="story">

      {/* ── Header ───────────────────────────── */}
      <section className="section story__header">
        <div className="container--content">
          <SectionHeading
            label="Our Story"
            title="How it all began"
          />
        </div>
      </section>

      {/* ── Main story ───────────────────────── */}
      <section className="section section--alt story__main">
        <div className="container--content">
          <div className="story__layout">

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
                That is where she and Elias first crossed paths. Something quiet
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
              <ImagePlaceholder
                label="Mirriam & Elias"
                aspectRatio="3 / 4"
              />
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── Photo grid ───────────────────────── */}
      <section className="section story__gallery">
        <div className="container--content">
          <p className="story__gallery-label">A few moments together</p>
          <div className="story__photos">
            <ImagePlaceholder label="Together · 2024" aspectRatio="4 / 3" />
            <ImagePlaceholder label="Engagement · 2025" aspectRatio="4 / 3" />
            <ImagePlaceholder label="Our world · 2025" aspectRatio="4 / 3" />
          </div>
        </div>
      </section>

    </div>
  );
}
