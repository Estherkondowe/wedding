/* =========================================================
   WEDDING DATA — single source of truth.
   Edit wedding details here; every page reads from this file.
   ========================================================= */

export const COUPLE = {
  nameA: 'Elia',
  nameB: 'Mirriam',
  initials: 'E & M',
  fullNames: 'Elia & Mirriam',
};

/* All times are Malawi (CAT, UTC+02:00). */
export const CEREMONY_START = '2026-11-07T08:00:00+02:00';
export const CEREMONY_END   = '2026-11-07T11:00:00+02:00';
export const RECEPTION_START = '2026-11-07T13:00:00+02:00';
export const RECEPTION_END   = '2026-11-07T18:00:00+02:00';

export const DATE_LINE = 'Saturday, 7 November 2026';
export const DATE_ISO  = '2026-11-07';
export const RSVP_DEADLINE = '31 October 2026';
export const CITY = 'Lilongwe, Malawi';

export const CEREMONY = {
  type: 'Ceremony',
  venue: 'Bride Tabernacle',
  area: 'Mchesi',
  address: 'Mchesi, Lilongwe',
  time: '8:00 AM',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bride+Assembly+Tabernacle+Mchesi+Lilongwe',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.536511758266!2d33.7903485!3d-13.986171500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3002ac1cc47%3A0x1bef9ef53e26c3d7!2sBride%20Assembly%20Tabernacle%20~%20Mchesi%20~!5e0!3m2!1sen!2smw!4v1792361063491!5m2!1sen!2smw',
};

export const RECEPTION = {
  type: 'Reception',
  venue: 'Logos Ministries Gardens',
  area: 'Lilongwe',
  address: 'Lilongwe',
  time: '1:00 PM',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Logos+Ministries+Lilongwe',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d967.8541390166216!2d33.78255712847425!3d-13.993297197841523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d3feb5636fbd%3A0x6e9ea65be49ee768!2sLogos%20Ministries!5e0!3m2!1sen!2smw!4v1792361404883!5m2!1sen!2smw',
};

/* Order of the day — confirmed events only. When the full program is
   announced, add entries here and clear PROGRAM_NOTE. */
export const SCHEDULE = [
  { time: '8:00 AM',  title: 'Holy Matrimony',  detail: 'The ceremony begins at Bride Tabernacle. Please be seated by 7:45 AM.' },
  { time: '1:00 PM',  title: 'Reception',        detail: 'Lunch and celebration begin at Logos Ministries Gardens.' },
];

export const PROGRAM_NOTE =
  'The full program — speeches, cake, dancing — will be announced closer to the date. Check back here or watch your WhatsApp.';

export const CONTACTS = [
  { role: 'Mr Chirwa',   phoneDisplay: '0995 979 684', phoneRaw: '+265995979684' },
  { role: 'Mr Kondowe',  phoneDisplay: '0999 914 961', phoneRaw: '+265999914961' },
];

export const PALETTE = [
  { name: 'Chocolate Brown', hex: '#4A2C1A', role: 'Primary' },
  { name: 'Beige',           hex: '#F5EFE6', role: 'Background' },
  { name: 'Champagne',       hex: '#D4AF7A', role: 'Accent' },
];

export const PHOTOS = {
  hero: '/photos/hero.jpg',
  portrait: '/photos/em.jpg',
  engagement: '/photos/mimi.jpg',
  couple: '/photos/mme.jpg',
};

export const DRESS_CODE = 'Elegant Attire · Brown · Beige · Champagne';
