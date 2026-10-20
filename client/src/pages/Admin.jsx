import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import usePageTitle from '../hooks/usePageTitle';
import { fetchRSVPs } from '../services/api';
import './Admin.css';

const STORAGE_KEY = 'wedding-admin-key';

function toCsv(rows) {
  const header = ['id', 'full_name', 'attending', 'guest_count', 'email', 'message', 'created_at'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [header.join(',')];
  rows.forEach(r => lines.push(header.map(h => esc(r[h])).join(',')));
  return lines.join('\r\n');
}

export default function Admin() {
  usePageTitle('Admin');

  const [key, setKey] = useState(() => sessionStorage.getItem(STORAGE_KEY) || '');
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(null);
  const [totals, setTotals] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async (adminKey) => {
    setLoading(true);
    setError('');
    try {
      const json = await fetchRSVPs(adminKey);
      setRows(json.data);
      setTotals(json.totals);
      sessionStorage.setItem(STORAGE_KEY, adminKey);
      setKey(adminKey);
    } catch (err) {
      setError(err.message);
      setRows(null);
      sessionStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (input.trim()) load(input.trim());
  };

  const handleExport = () => {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvp-submissions.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (!rows) {
    return (
      <div className="section admin">
        <div className="container--text">
          <SectionHeading
            as="h1"
            label="Private"
            title="RSVP Admin"
            subtitle="Enter the admin key to view submissions."
          />
          <form className="admin__unlock" onSubmit={handleUnlock}>
            <label className="form-field__label" htmlFor="admin-key">Admin key</label>
            <input
              id="admin-key"
              type="password"
              className="form-field__input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="admin__error" role="alert">{error}</p>}
            <button type="submit" className="btn btn--primary" disabled={loading || !input.trim()}>
              {loading ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="section admin">
      <div className="container">
        <div className="admin__bar">
          <div>
            <p className="section-heading__label">RSVP Admin</p>
            <p className="admin__summary">
              {totals?.guests ?? 0} guests attending · {totals?.attending ?? 0} accepting · {totals?.declining ?? 0} declining
            </p>
          </div>
          <div className="admin__actions">
            <button type="button" className="btn btn--ghost" onClick={() => load(key)} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            <button type="button" className="btn btn--primary" onClick={handleExport}>
              Export CSV
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                sessionStorage.removeItem(STORAGE_KEY);
                setRows(null); setTotals(null); setKey(''); setInput('');
              }}
            >
              Lock
            </button>
          </div>
        </div>

        {error && <p className="admin__error" role="alert">{error}</p>}

        <div className="admin__table-wrap">
          <table className="admin__table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Attending</th>
                <th scope="col">Guests</th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
                <th scope="col">Received</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.full_name}</td>
                  <td>
                    <span className={`admin__pill admin__pill--${r.attending ? 'yes' : 'no'}`}>
                      {r.attending ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>{r.attending ? r.guest_count : '—'}</td>
                  <td>{r.email || '—'}</td>
                  <td className="admin__message">{r.message || '—'}</td>
                  <td>{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="admin__empty">No RSVPs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
