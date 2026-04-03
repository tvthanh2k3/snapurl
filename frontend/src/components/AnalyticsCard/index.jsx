import { BASE_URL } from '../../constants/config';
import './AnalyticsCard.css';

function StatBox({ label, value, icon }) {
  return (
    <div className="stat-box">
      <span className="stat-box__icon">{icon}</span>
      <span className="stat-box__value">{value}</span>
      <span className="stat-box__label">{label}</span>
    </div>
  );
}

export default function AnalyticsCard({ data }) {
  if (!data) return null;

  const dateObj = new Date(data.createdAt);
  const createdDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;

  const shortUrl = `${BASE_URL}/${data.shortCode}`;

  return (
    <div className="analytics-card card animate-fade-in">
      <div className="analytics-card__top">
        <div className="analytics-card__info">
          <div className="analytics-card__short-row">
            <span className="badge badge--primary">/{data.shortCode}</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="analytics-card__short-link"
              id="analytics-short-link"
            >
              {shortUrl}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:'4px'}}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
          <p className="analytics-card__original">
            <span className="analytics-card__original-label">→</span>
            {data.originalUrl}
          </p>
        </div>
      </div>

      <div className="analytics-card__stats">
        <StatBox
          label="Tổng số lượt nhấp"
          value={data.totalClicks ?? 0}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          }
        />
        <StatBox
          label="Đã tạo"
          value={createdDate}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
        />
        <StatBox
          label="IP duy nhất"
          value={
            data.recentClicks
              ? new Set(data.recentClicks.map((c) => c.ipAddress).filter(Boolean)).size
              : 0
          }
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}
