const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Submit an RSVP
 * @param {{ full_name: string, guest_count: number, message: string }} data
 */
export async function submitRSVP(data) {
  const res = await fetch(`${BASE_URL}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Submission failed.');
  return json.data;
}
