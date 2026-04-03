import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../constants/config';
import { timeAgo } from '../../utils/timeAgo';
import './LinkHistory.css';

export default function LinkHistory({ links, onClear }) {
  // Trigger re-render every 30s
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  if (!links || links.length === 0) return null;

  const handleCopy = async (shortCode) => {
    const url = `${BASE_URL}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="link-history animate-fade-in" id="link-history">
      <div className="link-history__header">
        <h3 className="link-history__title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Liên kết gần đây
          <span className="link-history__count">{links.length}</span>
        </h3>
        <button
          className="btn-ghost link-history__clear"
          onClick={onClear}
          id="clear-history-btn"
          aria-label="Xóa lịch sử"
        >
          Xóa
        </button>
      </div>

      <ul className="link-history__list">
        {links.map((item) => {
          const shortUrl = `${BASE_URL}/${item.shortCode}`;
          return (
            <li key={item.shortCode} className="link-history__item">
              <div className="link-history__item-info">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-history__short"
                >
                  /{item.shortCode}
                </a>
                <span className="link-history__original">{item.originalUrl}</span>
              </div>
              <div className="link-history__item-actions">
                <span className="link-history__time">{timeAgo(item.createdAt)}</span>
                <button
                  className="btn-ghost link-history__copy"
                  onClick={() => handleCopy(item.shortCode)}
                  aria-label="Sao chép URL"
                  title="Sao chép URL"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
                <Link
                  to={`/analytics/${item.shortCode}`}
                  className="btn-ghost link-history__analytics"
                  aria-label="Xem thống kê"
                  title="Xem thống kê"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
