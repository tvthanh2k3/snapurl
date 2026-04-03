import { useState } from 'react';
import Loader from '../Loader';
import { isValidUrl } from '../../utils/validators';
import { createShortLink } from '../../services/api';
import './ShortenForm.css';

export default function ShortenForm({ onSuccess, onError }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) {
      setValidationError('Vui lòng nhập URL');
      return;
    }
    if (!isValidUrl(trimmed)) {
      setValidationError('Vui lòng nhập URL hợp lệ bắt đầu bằng http:// hoặc https://');
      return;
    }

    setLoading(true);
    onError('');
    try {
      const result = await createShortLink(trimmed);
      onSuccess(result);
      setUrl('');
    } catch (err) {
      onError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="shorten-form" onSubmit={handleSubmit} noValidate id="shorten-form">
      <div className="shorten-form__field">
        <input
          id="url-input"
          type="url"
          className={`input shorten-form__input ${validationError ? 'input--error' : ''}`}
          placeholder="https://example.com/duong-dan-rat-dai"
          value={url}
          onChange={handleChange}
          disabled={loading}
          aria-label="URL dài cần rút gọn"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          id="shorten-btn"
          type="submit"
          className="btn btn-primary shorten-form__btn"
          disabled={loading || !url.trim()}
        >
          {loading ? <Loader size="sm" /> : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              Rút gọn
            </>
          )}
        </button>
      </div>
      {validationError && (
        <p className="shorten-form__error" role="alert">{validationError}</p>
      )}
    </form>
  );
}
