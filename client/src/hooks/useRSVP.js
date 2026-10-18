import { useState } from 'react';
import { submitRSVP } from '../services/api';

const INITIAL = { full_name: '', guest_count: '1', message: '' };

export default function useRSVP() {
  const [fields,  setFields]  = useState(INITIAL);
  const [errors,  setErrors]  = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!fields.full_name.trim() || fields.full_name.trim().length < 2)
      e.full_name = 'Please enter your full name.';
    const count = Number(fields.guest_count);
    if (!Number.isInteger(count) || count < 1 || count > 10)
      e.guest_count = 'Enter a number between 1 and 10.';
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
        guest_count: Number(fields.guest_count),
        message:     fields.message.trim() || null,
      });
      setStatus('success');
    } catch (err) {
      setApiError(err.message);
      setStatus('error');
    }
  };

  return { fields, errors, status, apiError, handleChange, handleSubmit };
}
