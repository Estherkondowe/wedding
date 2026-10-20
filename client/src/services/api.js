const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Submit an RSVP
 * @param {{ full_name: string, attending: boolean, guest_count: number,
 *           email?: string, message?: string, website?: string }} data
 */
export async function submitRSVP(data) {
  const res = await fetch(`${BASE_URL}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json?.error || 'Submission failed.');
  return json.data;
}

/**
 * Fetch all RSVPs (admin only).
 * @param {string} adminKey — the ADMIN_KEY shared with the server
 */
export async function fetchRSVPs(adminKey) {
  const res = await fetch(`${BASE_URL}/rsvp`, {
    headers: { 'x-admin-key': adminKey },
  });
  const json = await parseJsonSafe(res);
  if (!res.ok) throw new Error(json?.error || 'Could not load RSVPs.');
  return json;
}
