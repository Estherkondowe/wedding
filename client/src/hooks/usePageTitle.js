import { useEffect } from 'react';

/** Sets document.title for the current page and restores the default on unmount. */
export default function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} · Mirriam & Elia` : 'Mirriam & Elia · 07.11.2026';
    return () => { document.title = previous; };
  }, [title]);
}
