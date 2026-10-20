import { useEffect } from 'react';
import { COUPLE } from '../data/wedding';

/** Sets document.title for the current page and restores the default on unmount. */
export default function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · ${COUPLE.fullNames}` : `${COUPLE.fullNames} · 07.11.2026`;
    return () => { document.title = previous; };
  }, [title]);
}
