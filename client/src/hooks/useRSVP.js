import { useState } from 'react';
import { submitRSVP } from '../services/api';

const INITIAL = {
  full_name: '',
  attending: 'yes',
  guest_count: '1',
  email: '',
  message: '',
  website: '', /* honeypot — must stay empty */
};

export default function useRSVP() {
  const [fields,  setFields]  = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState('');

  const attending = fields.attending === 'yes';

  const validate = () => {
    const e = {};
    if (!fields.full_name.trim() || fields.full_name.trim().length < 2)
      e.full_name = 'Please enter your full name.';

    if (attending) {
      const count = Number(fields.guest_count);
      if (!Number.isInteger(count) || count < 1 || count > 10)
        e.guest_count = 'Enter a number between 1 and 10.';
    }

    const email = fields.email.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Please enter a valid email address, or leave it blank.';

    if (fields.message.length > 500)
      e.message = 'Message must be under 500 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setStatus('loading');
    setApiError('');
    try {
      await submitRSVP({
        full_name:   fields.full_name.trim(),
        attending,
        guest_count: attending ? Number(fields.guest_count) : 0,
        email:       fields.email.trim() || null,
        message:     fields.message.trim() || null,
        website:     fields.website, /* honeypot */
      });
      setStatus('success');
    } catch (err) {
      setApiError(err.message);
      setStatus('error');
    }
  };

  return {
    fields, errors, status, apiError, attending,
    handleChange, handleSubmit,
  };
}
