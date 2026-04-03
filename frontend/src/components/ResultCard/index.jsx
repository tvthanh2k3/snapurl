import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/config';
import './ResultCard.css';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const shortUrl = `${BASE_URL}/${result.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = shortUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="result-card card card--glow animate-fade-in" id="result-card">
      <div className="result-card__header">
        <span className="badge badge--accent">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="5"/>
          </svg>
          Đã tạo liên kết
        </span>
      </div>

      <div className="result-card__url-row">
        <div className="result-card__short-url">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="result-card__link"
            id="short-url-link"
          >
            {shortUrl}
          </a>
        </div>
        <button
          id="copy-btn"
          className={`btn result-card__copy-btn ${copied ? 'result-card__copy-btn--copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Đã sao chép!' : 'Sao chép vào khay nhớ tạm'}
          title={copied ? 'Đã sao chép!' : 'Sao chép vào khay nhớ tạm'}
        >
          {copied ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Đã sao chép!
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Sao chép
            </>
          )}
        </button>
      </div>

      <div className="result-card__original">
        <span className="result-card__original-label">Gốc:</span>
        <span className="result-card__original-url">{result.originalUrl}</span>
      </div>

      <div className="result-card__footer">
        <Link
          to={`/analytics/${result.shortCode}`}
          className="result-card__analytics-link"
          id="view-analytics-btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          Xem thống kê
        </Link>
      </div>
    </div>
  );
}
